import main as m
import config

app = m.create_app()

if __name__ == '__main__':
    m.socketio.run(app, host='0.0.0.0')
