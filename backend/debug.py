from Flaskr import app
from waitress import serve

if __name__ == '__main__':
    # app.secret_key = 'dev'
    serve(app, host='127.0.0.1', port=5000)
