import datetime

JSON_AS_ASCII = True
DEBUG = False
ENV = 'production'
SECRET_KEY = 'SnowCabbage'
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:kissyou@127.0.0.1:3306/test'
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)
PROPAGATE_EXCEPTIONS = True
