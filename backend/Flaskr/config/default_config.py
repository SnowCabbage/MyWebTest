import datetime

from Flaskr.config.host import host

JSON_AS_ASCII = True
DEBUG = True
ENV = 'development'
SECRET_KEY = 'dev'
JWT_SECRET_KEY = 'dev'
SQLALCHEMY_DATABASE_URI = f'mysql://root:kissyou@{host}:6666/test'  # this is for windows
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)
JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=7)
PROPAGATE_EXCEPTIONS = True
