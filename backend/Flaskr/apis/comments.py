import json

from flask import Blueprint, request
from flask_restful import Resource

from Flaskr import db, api, limiter
from Flaskr.models import Comment, User, Movie

comments = Blueprint("comments", __name__)


class CommentListAPI(Resource):
    method_decorators = [limiter.limit("20/minute")]

    def get(self, movie_id):
        comments_queried = Comment.query.filter_by(movie_id=movie_id)
        res = {}
        data = {}
        comments = []
        num = 0
        for cmt in comments_queried:
            num += 1
            comments.append({'id': cmt.id,
                             'content': cmt.content,
                             'update_time': cmt.update_time,
                             'author': cmt.author.username,
                             'avatar_id': cmt.avatar_id
                             })
        data['num'] = num
        data['comments'] = comments
        res['code'] = 'OK'
        res['data'] = data
        return res

    def post(self, movie_id):
        """
        example like this: "data":{"content": "", "author": "", "update_time": ""}
        """
        response_data = request.get_json()['data']
        # print(response_data)
        content = response_data['content']
        author = response_data['author']
        update_time = response_data['update_time']
        avatar_id = response_data['avatar_id']

        author_queried = User.query.filter_by(username=author).first()
        movie_queried = Movie.query.filter_by(id=movie_id).first()
        if author_queried is None:
            return {
                'code': 'Error',
                'message': "Invalid user"
            }
        if movie_queried is None:
            return {
                'code': 'Error',
                'message': "Invalid movie id"
            }
        # print(author_id)

        cmt = Comment(
            content=content, author=author_queried, update_time=update_time, avatar_id=avatar_id, movie=movie_queried
            # author_id=author_id
        )

        db.session.add(cmt)
        db.session.commit()

        res = {'code': 'OK', 'data': response_data}

        return res


api.add_resource(CommentListAPI, '/api/comments/<int:movie_id>', endpoint='comments')
