import os

from flask import Blueprint
from flask_restful import Resource

from Flaskr import api
from Flaskr.decorators.authUnit import admin_required
from Flaskr.decorators.loggerUnit import print_logger

system_func = Blueprint('system_func', __name__)


class SystemResetAPI(Resource):
    # method_decorators = [admin_required()]
    """
    reset the system
    """
    @print_logger()
    def post(self):
        # os.system('$env:FLASK_APP="Flaskr"')
        os.system('dir')
        # print('$env:FLASK_APP="Flaskr"')
        os.system('flask --app Flaskr --help')
        os.system('flask --app Flaskr init --drop')

        return {
            'code': 'OK',
            'message': ''
        }


api.add_resource(SystemResetAPI, '/api/system/reset', endpoint='system_reset')
