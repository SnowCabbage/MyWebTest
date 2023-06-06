from functools import wraps

from flask import jsonify, request, current_app

from Flaskr import jwt

from flask_jwt_extended import get_jwt
from flask_jwt_extended import verify_jwt_in_request

from Flaskr.support.userAgentCheck import check_user_agent


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    """
    return a response when the token is expired
    :param jwt_header:
    :param jwt_payload:
    :return:
    """
    current_app.logger.warn("The token expired one attempt to access")
    return jsonify(code="401", message="token expired"), 401


def admin_required():
    """
    a decorator that checks if the user has admin rights
    :return:
    """
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            # print(claims)
            if claims["role"] == "Admin":
                return fn(*args, **kwargs)
            else:
                current_app.logger.warn("The Non-administrator attempt to operate")
                return {
                    "code": "Error",
                    "message": "No permission",
                }, 403

        return decorator

    return wrapper


def user_agent_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if not check_user_agent(request):
                return {
                    'code': 'Error',
                    'message': 'Invalid access'
                }
            return fn(*args, **kwargs)

        return decorator

    return wrapper
