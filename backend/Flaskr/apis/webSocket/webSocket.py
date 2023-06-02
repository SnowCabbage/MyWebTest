from flask_socketio import emit

from Flaskr import socketio

current_online = 0  # a global variable to keep the current online people


@socketio.on('disconnect')
def on_disconnect():
    global current_online
    current_online -= 1
    emit('online', {'online': current_online}, broadcast=True)
    print('Disconnected')


@socketio.on('connect')
def on_connect():
    global current_online
    current_online += 1
    emit('online', {'online': current_online}, broadcast=True)
    print('Connected')


@socketio.on('connected')
def handle_my_custom_event(json):
    # print('received json: ' + str(json))
    pass


@socketio.on('message')
def handle_my_custom_event(json):
    # print('received json: ' + str(json))
    # print(json['data'])
    pass
