from functools import wraps

from flask import jsonify

from Flaskr import jwt

from flask_jwt_extended import get_jwt
from flask_jwt_extended import verify_jwt_in_request


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    """返回 flask Response 格式"""
    return jsonify(code="401", err="token expired"), 401


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            print(claims)
            if claims["role"] == "admin":
                return fn(*args, **kwargs)
            else:
                return "你没有足够权限", 403

        return decorator

    return wrapper
