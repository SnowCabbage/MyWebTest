from flask import Blueprint, send_file
from flask_restful import Resource

from Flaskr import api

images = Blueprint('images', __name__)


class ImagesAPI(Resource):
    """
    get the images
    """
    def get(self, image_id):
        filename = f'../Data/Upload/images/{image_id}.jpg'
        return send_file(filename)


api.add_resource(ImagesAPI, '/api/images/<string:image_id>', endpoint='image')
