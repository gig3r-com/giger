from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from .routes import routes_blueprint

app = Flask(__name__)

app.config.from_object('config')
socketio = SocketIO(app)
db = SQLAlchemy(app)


def create_app(debug=False):
    app.debug = debug

    app.register_blueprint(routes_blueprint)

    return app
