import datetime
import os
import sys

from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

app = Flask(__name__, static_folder='frontend_static', static_url_path='/frontend_static')
jwt = JWTManager()
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)


app.config.from_pyfile('./config/default_config.py')
# app.config.from_pyfile('./config/production_config.py')


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
