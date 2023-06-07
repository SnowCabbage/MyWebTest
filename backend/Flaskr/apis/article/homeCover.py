from flask import Blueprint, request, current_app
from flask_restful import Resource

from Flaskr import api, limiter, db
from Flaskr.tables.models import HomeCover
from Flaskr.support.fileSave import file_save

home_cover = Blueprint('home_cover', __name__)


class HomeCoverApi(Resource):
    method_decorators = [limiter.limit("20/minute")]

    def get(self):
        """
        get home cover
        :return:
        """
        data = {}
        covers = HomeCover.query.all()
        # print(users)
        data['covers'] = {}
        data['covers']['cover'] = []
        num = 0
        for cover in covers:
            num += 1
            data['covers']['cover'].append({'cover_id': cover.cover_id, 'cover_name': cover.cover_name})
        data['covers']['num'] = num
        data['code'] = 'OK'
        return data

    def post(self):
        """
        change home cover
        :return:
        """
        file = request.files
        response_data = request.form

        # debug
        # print(file)
        # print(response_data)
        try:
            home_cover_id = response_data.get('cover')
        except AttributeError as e:
            current_app.logger.error("get the invalid request data")
            return {
                'code': 'Error',
                'message': "Invalid request data"
            }

        update_home_cover = HomeCover.query.filter_by(id=home_cover_id).first()

        if update_home_cover is None:
            return {
                'code': 'Error',
                'message': 'home_cover does not exist'
            }
        response = file_save(file)

        if response['code'] == 'Error':
            return {
                'code': 'Error',
                'message': "Format Error",
                'image_id': ""
            }

        image_id = response['image_id']

        # debug
        # print(response['image_id'])
        # print(user)
        # print(update_user.userprofile.image_id)

        update_home_cover.cover_id = image_id
        db.session.commit()

        return {
            'code': 'OK',
            'message': "Upload successfully",
            'image_id': image_id
        }


api.add_resource(HomeCoverApi, '/api/home_cover', endpoint='home_cover')