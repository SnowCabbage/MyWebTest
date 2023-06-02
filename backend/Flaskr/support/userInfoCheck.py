import json

from Flaskr.models import User


def user_info_check(data):

    # debug
    # print("data:", data)
    # print(type(post_data))

    if type(data) != dict:
        post_data = json.loads(data)

    username = data.get('username', None)
    user = User.query.filter_by(username=username).first()
    if user is None:
        return {'code': 'OK', 'message': ''}
    return {'code': 'Error', 'message': 'username exists'}