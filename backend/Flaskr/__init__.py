from flask import Flask, render_template, make_response, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_limiter import Limiter, RequestLimit

app = Flask(__name__, static_folder='frontend_static', static_url_path='/frontend_static')
jwt = JWTManager()
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

app.config.from_pyfile('./config/default_config.py')


# app.config.from_pyfile('./config/production_config.py')

# set the default response
def default_error_responder(request_limit: RequestLimit):
    return make_response(
        # render_template("my_ratelimit_template.tmpl", request_limit=request_limit)
        jsonify(code="Error", message='ratelimit exceeded'),
        429
    )


def get_real_ip():
    if 'X-Real-IP' in request.headers:
        return request.headers['X-Real-IP']
    else:
        return '127.0.0.1'


jwt.init_app(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
limiter = Limiter(key_func=get_real_ip,
                  app=app,
                  # storage_uri="redis://localhost:6379",
                  on_breach=default_error_responder
                  )

from Flaskr.apis.user.user import users
from Flaskr.apis.article.movies import movies
from Flaskr.apis.user.loginAuth import loginAuth
from Flaskr.apis.user.informationCheck import informationCheck
from Flaskr.apis.article.comments import comments
from Flaskr.apis.files.fileUpload import fileUpload
from Flaskr.apis.files.images import images
from Flaskr.apis.article.homeCover import home_cover

app.register_blueprint(users)
app.register_blueprint(movies)
app.register_blueprint(loginAuth)
app.register_blueprint(informationCheck)
app.register_blueprint(comments)
app.register_blueprint(fileUpload)
app.register_blueprint(images)
app.register_blueprint(home_cover)

from Flaskr import models, commands
from Flaskr.decorators.authUnit import my_expired_token_callback


@app.route('/')
def index():
    return render_template('index.html')


# 没找到通配符的方法，暂时这样写
@app.errorhandler(404)
def hello(error):
    # debug
    # print(get_real_ip())
    return render_template("index.html")
