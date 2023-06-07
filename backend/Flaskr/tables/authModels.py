from Flaskr import db


class TokenManageList(db.Model):
    __tablename__ = 'token_manage_list'
    id = db.Column(db.Integer, primary_key=True)
    current_token = db.Column(db.String(36))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('token_manage_list'))
    fresh_token = db.Column(db.DateTime)

class TokenBlocklist(db.Model):
    __tablename__ = 'token_blocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
