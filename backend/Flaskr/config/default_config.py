import datetime

JSON_AS_ASCII = True
DEBUG = True
ENV = 'development'
SECRET_KEY = 'dev'
SQLALCHEMY_DATABASE_URI = 'mysql://root:kissyou@127.0.0.1:6666/test'  # this is for windows
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)
PROPAGATE_EXCEPTIONS = True
