# 图床上传，暂时废弃

import requests

DRAWING_BED_API = 'https://api.uomg.com/api/image.ali'

TOKEN = 'b6fba716df39c259fdc01e77f91ce443'

file_path = '../../Data/Upload/images/1.jpg'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/44.0.2403.155 Safari/537.36',
    }


def handleAvatar(file_path):
    with open(file_path, 'rb') as f:
        response = requests.post(DRAWING_BED_API, files={"file": f}, headers=headers)
        # print(response.text)


if __name__ == '__main__':
    handleAvatar(file_path)
