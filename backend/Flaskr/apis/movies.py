from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from Flaskr import api, db, limiter
from Flaskr.decorators.authUnit import admin_required
from Flaskr.models import Movie, Comment

movies = Blueprint('movies', __name__)


class MovieListAPI(Resource):
    method_decorators = [jwt_required(), limiter.limit("20/minute")]

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
                           'update_date': m.update_date,
                           'desc': m.desc,
                           'url': m.url,
                           'content': m.content,
                           'create_by': m.create_by,
                           'avatar_id': m.avatar_id,
                           })
        data['num'] = num
        data['movies'] = movies
        res['code'] = 'OK'
        res['data'] = data
        return res

    def post(self):
        response_object = {'code': 'OK'}
        # print(request)
        post_data = request.get_json()
        # Get the last id
        try:
            id_the_last = Movie.query.order_by(Movie.id.desc()).first().id
        except AttributeError:
            id_the_last = 0
        # print(movie_test)
        name = post_data['data']['name']
        update_date = post_data['data']['update_date']
        desc = post_data['data']['desc']
        url = f'/movies/{id_the_last + 1}'
        content = post_data['data']['content']
        create_by = post_data['data']['create_by']
        avatar_id = post_data['data']['avatar_id']
        response_object['data'] = post_data['data']

        m = Movie(title=name,
                  update_date=update_date,
                  desc=desc,
                  url=url,
                  content=content,
                  create_by=create_by,
                  avatar_id=avatar_id
                  )
        db.session.add(m)
        db.session.commit()
        id_the_new = Movie.query.order_by(Movie.id.desc()).first().id
        new_movie = Movie.query.get_or_404(id_the_new)
        new_movie.url = f'/movies/{id_the_new}'

        db.session.commit()
        return response_object, 200


class MovieAPI(Resource):
    method_decorators = [limiter.limit("20/minute")]

    @jwt_required()
    def get(self, movie_id):
        movie_queried = Movie.query.get_or_404(movie_id, "Nonexistent")
        res = {}
        data = {'desc': movie_queried.desc, 'title': movie_queried.title, 'update_date': movie_queried.update_date,
                'create_by': movie_queried.create_by, 'content': movie_queried.content}
        res['code'] = 'OK'
        res['data'] = data
        return res

    @admin_required()
    def delete(self, movie_id):
        movie_queried = Movie.query.get_or_404(movie_id, "Nonexistent")
        res = {}

        comments_queried = Comment.query.filter_by(movie=movie_queried)
        for cmt in comments_queried:
            db.session.delete(cmt)
        # db.session.commit()

        db.session.delete(movie_queried)
        db.session.commit()

        res['code'] = 'OK'
        res['data'] = 'Delete successfully'

        return res


api.add_resource(MovieListAPI, '/api/movies', endpoint='movies')
api.add_resource(MovieAPI, '/api/movies/<int:movie_id>', endpoint='movie')
