from Flaskr import app

if __name__ == '__main__':
    # app.secret_key = 'dev'
    app.run(debug=True, use_reloader=False)
