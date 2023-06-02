# set the default response
from flask import make_response, jsonify, request
from flask_limiter import RequestLimit

from Flaskr.config.host import host


def default_error_responder(request_limit: RequestLimit):
    """
    set the default error when request reaches the limit
    :param request_limit:
    :return:
    """
    return make_response(
        jsonify(code="Error", message='ratelimit exceeded'),
        429
    )


def get_real_ip():
    """
    Get the real IP address
    :return:
    """
    if 'X-Real-IP' in request.headers:
        return request.headers['X-Real-IP']
    else:
        return host
