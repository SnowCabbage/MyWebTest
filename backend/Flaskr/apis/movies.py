from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from Flaskr import api, db
from Flaskr.decorators.authUnit import admin_required
from Flaskr.models import Movie

movies = Blueprint('movies', __name__)


class MovieListAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self):
        movie_queried = Movie.query.all()
        res = {}
        data = {}
        movies = []
        num = 0
        for m in movie_queried:
            num += 1
            movies.append({'id': m.id,
                           'name': m.title,
                           'year': m.year,
                           'desc': m.desc,
                           'url': m.url})
        data['num'] = num
        data['movies'] = movies
        res['code'] = 'OK'
        res['data'] = data
        return res

    def post(self):
        response_object = {'code': 'OK'}
        # print(request)
        post_data = request.get_json()
        # logging.info(post_data)
        # print(post_data)
        name = post_data['data']['name']
        year = post_data['data']['year']
        desc = post_data['data']['desc']
        url = post_data['data']['url']
        response_object['data'] = post_data['data']

        m = Movie(title=name,
                  year=year,
                  desc=desc,
                  url=url)
        db.session.add(m)
        db.session.commit()
        return response_object, 201


class MovieAPI(Resource):
    method_decorators = [jwt_required()]

    def get(self, movie_id):
        movie_queried = Movie.query.get_or_404(movie_id)
        res = {}
        data = {}
        data['text'] = movie_queried.desc
        res['code'] = 'OK'
        res['data'] = data
        return res


api.add_resource(MovieListAPI, '/api/movies', endpoint='movies')
api.add_resource(MovieAPI, '/api/movie/<int:movie_id>', endpoint='movie')
