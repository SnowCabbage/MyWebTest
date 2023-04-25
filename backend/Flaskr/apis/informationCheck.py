from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from flask_restful import Resource

from Flaskr import api, db
from Flaskr.models import User

informationCheck = Blueprint('informationCheck', __name__)


class usernameCheckAPI(Resource):
    def post(self):
        response_object = {}
        post_data = request.get_json()
        username = post_data.get('username', None)
        user = User.query.filter_by(username=username).first()
        if user is None:
            return {'code': 'OK', 'message': ''}
        return {'code': 'Error', 'message': 'username exists'}


api.add_resource(usernameCheckAPI, '/api/username_check', endpoint='username_check')
