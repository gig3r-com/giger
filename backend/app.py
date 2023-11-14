from main import create_app, socketio
import config

app = create_app(config.DB_INIT)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
