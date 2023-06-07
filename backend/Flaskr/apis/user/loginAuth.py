from datetime import datetime, timezone, timedelta

from flask import Blueprint, request
from flask_jwt_extended import create_access_token, create_refresh_token, get_jti, decode_token
from flask_restful import Resource

from Flaskr import api, limiter, db
from Flaskr.tables.authModels import TokenBlocklist, TokenManageList
from Flaskr.tables.models import User
from Flaskr.support.defaultSetting import get_real_ip
from Flaskr.support.updateAddress import update_address

loginAuth = Blueprint('loginAuth', __name__)


class AuthAPI(Resource):
    method_decorators = [limiter.limit("20/minute")]

    def post(self):
        """
        login
        :return:
        """
        post_data = request.get_json()
        # print(post_data)
        username = post_data.get('username', None)
        password = post_data.get('password', None)
        user = User.query.filter_by(username=username).first()
        # print(username)
        # print(user)
        request_addr = get_real_ip()
        if not user or not user.verify_password(password):
            return {"code": "Error", "message": "Invalid account"}, 200

        addr = update_address(user, request_addr)
        access_token = create_access_token(username, additional_claims={"role": user.role})
        token_info = TokenManageList.query.filter_by(user=user).first()

        if token_info is None:
            db.session.add(TokenManageList(
                current_token=get_jti(access_token),
                user=user,
                fresh_token=datetime.now(timezone.utc) + timedelta(days=1)
            ))
            db.session.commit()
        else:
            jti = TokenManageList.query.filter_by(user=user).first().current_token
            db.session.add(TokenBlocklist(
                jti=jti,
                created_at=datetime.now(timezone.utc)
            ))
            token_info.current_token = get_jti(access_token)
            db.session.commit()

        return {
            "code": "OK",
            "access_token": access_token,
            "user_profile": {
                "user": username,
                "user_avatar": user.userprofile.image_id,
                "role": user.role,
                "address": addr
            }
        }


api.add_resource(AuthAPI, '/api/login', endpoint='loginAuth')
