from passlib.apps import custom_app_context as pwd_context

from Flaskr import db


class Userprofile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    # user = db.relationship('User', backref=db.backref('userprofile'))
    image_id = db.Column(db.String(20))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # 主键
    role = db.Column(db.String(20))
    username = db.Column(db.String(24))  # 名字
    password_hash = db.Column(db.String(128))
    profile_id = db.Column(db.Integer, db.ForeignKey("userprofile.id"))
    userprofile = db.relationship('Userprofile', backref=db.backref('user'))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)


class Movie(db.Model):  # 表名将会是 movie
    id = db.Column(db.Integer, primary_key=True)  # 主键
    title = db.Column(db.String(60))  # 标题
    update_date = db.Column(db.String(18))  # 更新日期
    desc = db.Column(db.String(100))
    content = db.Column(db.TEXT())
    url = db.Column(db.String(30))
    create_by = db.Column(db.String(30))
    avatar_id = db.Column(db.String(50))


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.TEXT())
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User', backref=db.backref('comment'))
    update_time = db.Column(db.String(30))
    avatar_id = db.Column(db.String(50))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    movie = db.relationship('Movie', backref=db.backref('movie'))


class HomeCover(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cover_id = db.Column(db.String(50))
    cover_name = db.Column(db.String(50))
