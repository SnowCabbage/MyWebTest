from datetime import datetime, timezone, timedelta
from functools import wraps

from flask import jsonify, request, current_app
from pytz import utc

from Flaskr import jwt, db

from flask_jwt_extended import get_jwt, create_access_token
from flask_jwt_extended import verify_jwt_in_request

from Flaskr.support.userAgentCheck import check_user_agent
from Flaskr.tables.authModels import TokenBlocklist, TokenManageList
from Flaskr.tables.models import User


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    """
    return a response when the token is expired
    :param jwt_header:
        exp: jwt_header:{'alg': 'HS256', 'typ': 'JWT'}
    :param jwt_payload:
        exp: jwt_payload:{'fresh': False, 'iat': 1685767778, 'jti': 'd30967ed-441b-42ce-bd6e-8c3e48684a80',
        'type': 'access', 'sub': 'admin', 'nbf': 1685767778, 'exp': 1685769578, 'role': 'Admin'}
    :return:
    """
    username = jwt_payload.get('sub')
    user = User.query.filter_by(username=username).first()
    token_info = TokenManageList.query.filter_by(user=user).first()
    fresh_exp = token_info.fresh_token.replace(tzinfo=utc)
    if datetime.now(timezone.utc) < fresh_exp:
        token_info.fresh_token = datetime.now(timezone.utc) + timedelta(days=1)
        db.session.commit()
    # use redis better later
        return {
            'code': "FRESH",
            'message': "",
            'access_token': create_access_token(username, additional_claims={"role": user.role})
        }
    current_app.logger.warn("The token expired one attempt to access" + '\n'
                                                                        "jwt_payload:" + str(jwt_payload))
    return jsonify(code="401", message="token expired"), 401


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    # print(jti)
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    # print(token)

    return token is not None


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
