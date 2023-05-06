import datetime
import os
import sys

from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

DEBUG = True
ENV = 'development'

WIN = sys.platform.startswith('win')
if WIN:  # 如果是 Windows 系统，使用三个斜线
    prefix = 'sqlite:///'
else:  # 否则使用四个斜线
    prefix = 'sqlite:////'

app = Flask(__name__, static_folder='frontend_static', static_url_path='/frontend_static')
app.secret_key = 'dev'
jwt = JWTManager()
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

app.config['JSON_AS_ASCII'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:kissyou@127.0.0.1:3306/test'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=30)
app.config['PROPAGATE_EXCEPTIONS'] = True

jwt.init_app(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from Flaskr.apis.user import users
from Flaskr.apis.movies import movies
from Flaskr.apis.loginAuth import loginAuth
from Flaskr.apis.informationCheck import informationCheck

app.register_blueprint(users)
app.register_blueprint(movies)
app.register_blueprint(loginAuth)
app.register_blueprint(informationCheck)

from Flaskr import models, commands
from Flaskr.decorators.authUnit import my_expired_token_callback


@app.route('/')
def index():
    return render_template('index.html')


# 没找到通配符的方法，暂时这样写
@app.errorhandler(404)
def hello(error):
    return render_template("index.html")
