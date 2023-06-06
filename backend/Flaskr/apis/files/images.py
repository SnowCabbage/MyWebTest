import os

from flask import Blueprint, send_file
from flask_restful import Resource

from Flaskr import api

images = Blueprint('images', __name__)


class ImagesAPI(Resource):
    """
    get the images
    """
    def get(self, image_id):
        filepath = 'Nonexistence'
        files = os.listdir('Data/Upload/images')
        for image in files:
            if image_id in image:
                filepath = f'../Data/Upload/images/{image}'
                break
        if filepath == 'Nonexistence':
            return {
                'code': 'NONE',
                'message': 'image not found'
            }
        return send_file(filepath)


api.add_resource(ImagesAPI, '/api/images/<string:image_id>', endpoint='image')
