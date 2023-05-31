import json

from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from flask_restful import Resource

from Flaskr import api, db
from Flaskr.models import User

informationCheck = Blueprint('informationCheck', __name__)


class UsernameCheckAPI(Resource):
    """
    check the username if exists in the database
    """
    def post(self):
        response_object = {}
        post_data = request.get_json()

        # debug
        # print("post_data:", post_data)
        # print(type(post_data))

        if type(post_data) != dict:
            post_data = json.loads(post_data)

        username = post_data.get('username', None)
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {'code': 'OK', 'message': ''}
        return {'code': 'Error', 'message': 'username exists'}


api.add_resource(UsernameCheckAPI, '/api/username_check', endpoint='username_check')
