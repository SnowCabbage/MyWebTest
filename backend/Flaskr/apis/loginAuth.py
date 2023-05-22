from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from flask_restful import Resource

from Flaskr import api
from Flaskr.models import User, Userprofile

loginAuth = Blueprint('loginAuth', __name__)


class AuthAPI(Resource):
    def post(self):
        post_data = request.get_json()
        # print(post_data)
        username = post_data.get('username', None)
        password = post_data.get('password', None)
        user = User.query.filter_by(username=username).first()
        # print(username)
        # print(user)
        if not user or not user.verify_password(password):
            return {"code": "Error", "message": "Invalid account"}, 200

        access_token = create_access_token(username, additional_claims={"role": user.role, "user": user.username})
        return {"code": "OK",
                "access_token": access_token,
                "user_profile": {
                    "user": username,
                    "user_avatar": user.userprofile.image_id
                }
                }


api.add_resource(AuthAPI, '/api/login', endpoint='loginAuth')
