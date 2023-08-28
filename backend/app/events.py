from backend.app import socketio
from flask_socketio import emit


@socketio.on('my event')
def test_message(message):
    emit('my response', {'data': message['data']})


@socketio.on('my broadcast event')
def test_message(message):
    emit('my response', {'data': message['data']}, broadcast=True)


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
