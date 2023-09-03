from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config.from_object('config')
socketio = SocketIO(app)
db = SQLAlchemy(app)


def create_app(debug=False):
    app.debug = debug

    from .routes.user_endpoints import api_v1
    app.register_blueprint(api_v1)

    return app
