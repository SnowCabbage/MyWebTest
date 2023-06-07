from flask import Blueprint, request, current_app
from flask_restful import Resource

from Flaskr import db, api, limiter
from Flaskr.decorators.loggerUnit import print_logger
from Flaskr.tables.models import Comment, User, Movie

comments = Blueprint("comments", __name__)


class CommentListAPI(Resource):
    method_decorators = [limiter.limit("20/minute")]

    def get(self, movie_id):
        """
        Get a list of comments
        :param movie_id:
        :return:
        """
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
                             'avatar_id': cmt.author.userprofile.image_id,
                             'address': cmt.author.userprofile.address,
                             })
        data['num'] = num
        data['comments'] = comments
        res['code'] = 'OK'
        res['data'] = data
        return res

    @print_logger()
    def post(self, movie_id):
        """
        example like this: "data":{"content": "", "author": "", "update_time": "", "avatar_id": ""}
        """
        try:
            response_data = request.get_json()['data']
            content = response_data['content']
            author = response_data['author']
            update_time = response_data['update_time']
        except KeyError as e:
            current_app.logger.error("get the invalid request data")
            return {
                'code': 'Error',
                'message': "Invalid request"
            }

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
            content=content, author=author_queried, update_time=update_time, movie=movie_queried
            # author_id=author_id
        )

        db.session.add(cmt)
        db.session.commit()

        res = {'code': 'OK', 'data': response_data}

        return res


api.add_resource(CommentListAPI, '/api/comments/<int:movie_id>', endpoint='comments')
