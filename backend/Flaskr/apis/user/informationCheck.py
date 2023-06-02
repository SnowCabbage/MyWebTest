from flask import Blueprint, request
from flask_restful import Resource

from Flaskr import api
from Flaskr.support.userInfoCheck import user_info_check

informationCheck = Blueprint('informationCheck', __name__)


class UsernameCheckAPI(Resource):
    """
    check the username if exists in the database
    """
    def post(self):
        post_data = request.get_json()

        # debug
        # print("post_data:", post_data)
        # print(type(post_data))

        response = user_info_check(post_data)
        return response


api.add_resource(UsernameCheckAPI, '/api/username_check', endpoint='username_check')
