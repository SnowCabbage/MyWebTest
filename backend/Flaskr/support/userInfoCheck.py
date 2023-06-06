import json

from Flaskr.models import User


def user_info_check(data):
    # debug
    # print("data:", data)
    # print(type(post_data))

    if type(data) != dict:
        data = json.loads(data)

    old_user = data.get('old_user')
    username = data.get('username', None)
    password = data.get('password', None)

    # print("username:", username)
    # print("password:", password)
    # print("old_user:", old_user)

    current_user = User.query.filter_by(username=old_user).first()
    check_user = User.query.filter_by(username=username).first()
    if password is None:
        if username == old_user or check_user is None:
            return {'code': 'OK', 'message': ''}
        return {'code': 'CHECK', 'message': 'username exists'}

    if current_user.verify_password(password):
        return {'code': 'CHECK', 'message': 'cannot set the same password twice'}
    return {'code': 'OK', 'message': ''}
