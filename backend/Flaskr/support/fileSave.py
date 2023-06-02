import os
import time
from os.path import exists

from Flaskr.decorators.loggerUnit import print_logger


@print_logger()
def file_save(file, data):

    # debug
    # print(file)
    # print(data)

    if len(file) == 0:
        # print('1')
        # 表示没有发送文件
        return {
            'code': 'Error',
            'message': "the file does not exist"
        }

    # debug
    # print(len(file))
    nowTime = []

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

        nowTime.append(str(int(time.time())))  # 获取当前时间戳改文件名

        RESULTS_DIR = 'Data/Upload/images'
        exists(RESULTS_DIR) or os.makedirs(RESULTS_DIR)

        file.save(f'{RESULTS_DIR}/' + f'{nowTime[0]}' + suffix)  # 保存文件

    return {
        'code': 'OK',
        'message': "Upload successfully",
        'image_id': nowTime[0]
    }