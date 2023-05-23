import json

import requests
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from Flaskr import api, db
from Flaskr.models import User, Userprofile

users = Blueprint('users', __name__)


class UserListAPI(Resource):
    # method_decorators = [jwt_required()]

    # @admin_required()
    @jwt_required()
    def get(self):
        data = {}
        users = User.query.all()
        # print(users)
        data['users'] = {}
        data['users']['user'] = []
        num = 0
        for user in users:
            num += 1
            data['users']['user'].append({'username': user.username, 'passwd': user.password_hash})
            # print(user.username, user.password_hash)
        data['users']['num'] = num
        data['code'] = 'OK'
        # data['user'] = user.username
        return data

    def post(self):
        response_object = {}
        post_data = request.get_json()
        username = post_data['data']['username']
        password = post_data['data']['password']
        if username == '' or password == '':
            response_object['code'] = 'ERROR'
            response_object['message'] = 'Invalid username or password'
            return response_object, 400

        check_response = requests.post('http://127.0.0.1:8080/api/username_check',
                                       json=json.dumps({'username': username}))
        check_response = json.loads(check_response.content)
        if check_response['code'] == 'Error':
            return {
                'code': 'Error',
                'message': 'Account exist!'
            }

        response_object['code'] = 'OK'

        user_info = Userprofile(
            image_id='1'
        )
        newUser = User(
            username=username,
            role='guest',
            userprofile=user_info
        )
        newUser.hash_password(password)
        db.session.add(newUser)
        db.session.commit()
        return response_object


class UserApi(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        user_rev = request.args.get('user')

        # debug
        # print(user_rev)

        user = User.query.filter_by(username=user_rev).first()
        if user is None:
            return {
                "code": "Error",
                "message": "Invalid account"
            }
        return {
            "code": "OK",
            "message": "success",
            "data": {
                "username": user.username,
                "role": user.role,
                "profile": {
                    "avatar_id": user.userprofile.image_id
                }
            }
        }

    def post(self):
        response_object = {}
        post_data = request.get_json()
        new_username = post_data['data']['new_username']
        user = post_data['data']['user']

        # debug
        # print(user, new_username)

        changeUser = User.query.filter_by(username=user).first()
        changeUser.username = new_username

        db.session.commit()
        response_object['code'] = 'OK'
        response_object['data'] = {
            "code": "OK",
            "user_profile": {
                "user": changeUser.username,
                "user_avatar": changeUser.userprofile.image_id
            }
        }
        return response_object


class UserAvatarApi(Resource):
    def post(self):
        file = request.files
        response_data = request.form

        # debug
        # print(file)
        # print(response_data)

        file_name = file.get('file1').filename
        content = file.get('file1').read()
        payload_file = {'file1': (file_name, content)}
        user = response_data.get('user')

        update_user = User.query.filter_by(username=user).first()

        if update_user is None:
            return {
                'code': 'Error',
                'message': 'User does not exist'
            }

        payload_data = {'user': user}
        response = requests.post('http://127.0.0.1:8080/api/fileImageUpload', files=payload_file, data=payload_data)
        response = json.loads(response.content)

        if response['code'] == 'Error':
            return {
                    'code': 'Error',
                    'message': "Format Error",
                    'image_id': ""
                }

        image_id = response['image_id']

        # debug
        # print(response['image_id'])
        # print(user)
        # print(update_user.userprofile.image_id)

        update_user.userprofile.image_id = image_id
        db.session.commit()

        return {
            'code': 'OK',
            'message': "Upload successfully",
            'image_id': image_id
        }


api.add_resource(UserListAPI, '/api/users', endpoint='users')
api.add_resource(UserApi, '/api/setting', '/api/user', endpoint='user')
api.add_resource(UserAvatarApi, '/api/avatar', endpoint='avatar')
