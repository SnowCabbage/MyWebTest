from Flaskr import app, socketio


# def serverOn():
#     # name = multiprocessing.current_process().name
#     name = multiprocessing.current_process().name
#     print("Starting %s " % name)
#     serve(app, host='127.0.0.1', port=5000)
#     print("Exiting %s " % name)


if __name__ == '__main__':
    # serve(app, host='127.0.0.1', port=5000)
    socketio.run(app, port=8080, debug=True)
    # app.run(port=8080)
