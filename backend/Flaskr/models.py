from itsdangerous import SignatureExpired, BadSignature

from Flaskr import db, app
from passlib.apps import custom_app_context as pwd_context


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)  # 主键
    role = db.Column(db.String(20))  # 名字
    username = db.Column(db.String(20))
    password_hash = db.Column(db.String(20))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)


class Movie(db.Model):  # 表名将会是 movie
    id = db.Column(db.Integer, primary_key=True)  # 主键
    title = db.Column(db.String(60))  # 电影标题
    year = db.Column(db.String(4))  # 电影年份
    desc = db.Column(db.String(100))
    url = db.Column(db.String(30))
    create_by = db.Column(db.String(30))
