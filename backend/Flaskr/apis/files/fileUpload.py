import os
import time
from os.path import exists

from flask import Blueprint, request
from flask_restful import Resource

from Flaskr import api, limiter

fileUpload = Blueprint('fileUpload', __name__)


class FileImageUploadAPI(Resource):
    method_decorators = [limiter.limit("20/minute")]

    def post(self):
        global nowTime
        file = request.files
        # response_data = request.form

        # debug
        # print(file)
        # print(response_data.get('user'))

        if file is None:
            # 表示没有发送文件
            return {
                'message': "文件上传失败"
            }

        # debug
        # print(len(file))

        for idx in range(1, len(file) + 1):
            file_id = f'file{idx}'

            # debug
            # print(file_id)

            file = file.get(file_id)
            file_name = file.filename

            # 获取前缀（文件名称） debug
            # print(os.path.splitext(file_name)[0])

            # 获取后缀（文件类型） debug
            # print(os.path.splitext(file_name)[-1])

            suffix = os.path.splitext(file_name)[-1]  # 获取文件后缀（扩展名）

            # debug
            # print(suffix)

            if suffix != '.jpg' and suffix != '.png':
                return {
                    'code': 'Error',
                    'message': "Format Error",
                    'image_id': ""
                }

            basePath = os.path.dirname(__file__)  # 当前文件所在路径
            nowTime = str(int(time.time()))  # 获取当前时间戳改文件名

            RESULTS_DIR = 'Data/Upload/images'
            exists(RESULTS_DIR) or os.makedirs(RESULTS_DIR)

            file.save(f'{RESULTS_DIR}/' + f'{nowTime}' + suffix)  # 保存文件

            # http 路径
            # url = RESULTS_DIR + '/' + str(nowTime) + suffix

        return {
            'code': 'OK',
            'message': "Upload successfully",
            'image_id': nowTime
        }


api.add_resource(FileImageUploadAPI, '/api/fileImageUpload', endpoint='fileImageUpload')
