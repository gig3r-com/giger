from main import create_app, socketio

app = create_app(db_init=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
