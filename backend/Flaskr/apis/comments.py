from flask import Blueprint, request
from flask_restful import Resource

from Flaskr import db, api
from Flaskr.models import Comment, User

comments = Blueprint("comments", __name__)


class CommentListAPI(Resource):
    def get(self):
        comments_queried = Comment.query.all()
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
                             })
        data['num'] = num
        data['comments'] = comments
        res['code'] = 'OK'
        res['data'] = data
        return res

    def post(self):
        """
        example like this: "data":{"content": "", "author": "", "update_time": ""}
        """
        response_data = request.get_json()['data']
        print(response_data)
        content = response_data['content']
        author = response_data['author']
        update_time = response_data['update_time']

        author_queried = User.query.filter_by(username=author).first()
        # print(author_id)

        cmt = Comment(
            content=content, author=author_queried, update_time=update_time
            # author_id=author_id
        )

        db.session.add(cmt)
        db.session.commit()

        res = {'code': 'OK', 'data': response_data}

        return res


api.add_resource(CommentListAPI, '/api/comments', endpoint='comments')
