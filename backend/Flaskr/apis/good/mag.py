import random

from flask import Blueprint, request
from flask_restful import Resource

from Flaskr import api, limiter
from Flaskr.decorators.authUnit import admin_required
from Flaskr.decorators.loggerUnit import print_logger
from Flaskr.tables.models import Goods
from Flaskr.support.fileSave import file_save
from Flaskr.support.updateGoods import update_goods

goods = Blueprint('goods', __name__)


class GoodsAPI(Resource):
    method_decorators = [admin_required(), limiter.limit("20/minute")]
    """
    Goods API
    """
    @print_logger()
    def post(self):
        """
        post the json data
        :return:
        """
        file = request.files
        # print(file)
        path = file_save(file, mode='goods', path='Data/Upload/goods_data')['path']
        update_goods(path)

        return {
            'code': 'OK',
            'message': ''
        }

    @print_logger()
    def get(self):
        good_name = []
        mags = []
        goods_queried = Goods.query.all()
        for good in goods_queried:
            if good.name in set(good_name):
                continue
            good_name.append(good.name)
        good_select = random.choice(good_name)
        mags_queried = Goods.query.filter_by(name=good_select).all()
        for mag in mags_queried:
            mags.append(mag.mag)
        mag_select = random.choice(mags)
        # print(mags)
        # print(good_name)
        return {
            'code': 'OK',
            'mag': mag_select
        }


api.add_resource(GoodsAPI, '/api/goods', endpoint='goods')
