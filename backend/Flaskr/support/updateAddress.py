import json

import requests

from Flaskr import db


def update_address(user, ip):
    """
    update the user's last address
    :return:
    """

    check = True
    r = requests.post('http://ip-api.com/json/{}?lang=zh-CN '.format(ip)).text
    r = json.loads(r)

    try:
        addr = r['regionName'] + '-' + r['city']
    except KeyError:
        check = False
        addr = "unknown"

    if check:
        user.userprofile.address = addr
        db.session.commit()
    return addr
