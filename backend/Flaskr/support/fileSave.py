import os
import time
from os.path import exists

from Flaskr.decorators.loggerUnit import print_logger


@print_logger()
def file_save(file, *, mode='image', path='Data/Upload/images'):
    # debug
    # print(file)

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

        if suffix != '.jpg' and suffix != '.png' and mode == 'image':
            return {
                'code': 'Error',
                'message': "Format Error",
                'image_id': ""
            }

        nowTime.append(str(int(time.time())))  # 获取当前时间戳改文件名

        # RESULTS_DIR = 'Data/Upload/images'
        exists(path) or os.makedirs(path)
        # 保存文件
        # print(suffix, mode)
        if mode == 'image':
            file.save(f'{path}/' + f'{nowTime[0]}' + suffix)
            return {
                'code': 'OK',
                'message': "Upload successfully",
                'image_id': nowTime[0]
            }
        elif mode == 'goods':
            file.save(f'{path}/goods_data' + suffix)
            return {
                'code': 'OK',
                'message': "Upload successfully",
                'path': f'{path}/goods_data' + suffix
            }


