from flask import Blueprint, request, current_app
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from Flaskr import api, db, limiter
from Flaskr.decorators.authUnit import user_agent_required
from Flaskr.decorators.loggerUnit import print_logger
from Flaskr.models import User, Userprofile
from Flaskr.support.fileSave import file_save
from Flaskr.support.userInfoCheck import user_info_check

users = Blueprint('users', __name__)


class UserListAPI(Resource):
    method_decorators = [limiter.limit("20/minute"), user_agent_required()]

    # @admin_required()
    @jwt_required()
    @print_logger()
    def get(self):
        """
        get a list of users
        :return:
        """
        data = {}
        users = User.query.all()
        # print(users)
        data['users'] = {}
        data['users']['user'] = []
        num = 0
        for user in users:
            num += 1
            data['users']['user'].append({'username': user.username})
            # print(user.username, user.password_hash)
        data['users']['num'] = num
        data['code'] = 'OK'
        # data['user'] = user.username
        return data

    @print_logger()
    def post(self):
        """
        registers a user
        :return:
        """
        response_object = {}
        post_data = request.get_json()
        try:
            username = post_data['data']['username']
            password = post_data['data']['password']
        except KeyError as e:
            current_app.logger.error("get the invalid request data")
            return {
                'code': 'Error',
                'message': "Invalid request data"
            }

        if username == '' or password == '':
            response_object['code'] = 'ERROR'
            response_object['message'] = 'Invalid username or password'
            return response_object, 400

        check_response = user_info_check({'username': username})
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
    method_decorators = [jwt_required(), limiter.limit("20/minute"), user_agent_required()]

    @print_logger()
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

    @print_logger()
    def post(self):
        """
        update the user's profile
        :return:
        """
        response_object = {}
        post_data = request.get_json()
        try:
            new_username = post_data['data']['new_username']
            user = post_data['data']['user']
        except KeyError as e:
            current_app.logger.error("get the invalid request data")
            return {
                'code': 'Error',
                'message': "Invalid request data"
            }

        # debug
        # print(user, new_username)

        check_username = User.query.filter_by(username=new_username).first()
        if check_username is not None:
            return {
                "code": "Error",
                "message": "The username has existed"
            }

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
    method_decorators = [limiter.limit("20/minute")]

    @print_logger()
    def post(self):
        """
        update the user's avatar
        :return:
        """
        file = request.files
        response_data = request.form
        # debug
        print(file)
        print(response_data)
        try:
            user = response_data.get('user')
        except AttributeError:
            return {
                'code': 'Error',
                'message': 'the key of user does not exist'
            }

        update_user = User.query.filter_by(username=user).first()
        if update_user is None:
            return {
                'code': 'Error',
                'message': 'User does not exist'
            }
        response = file_save(file)
        print(response)

        if response['code'] == 'Error':
            return {
                'code': 'Error',
                'message': response['message'],
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
