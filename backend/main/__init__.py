from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
socketio = SocketIO(app)
db = SQLAlchemy()


def create_app(debug=False):
    app.debug = debug
    app.config.from_object('config')

    with app.app_context():
        db.init_app(app)
        create_tables()
        from .routes.user_endpoints import api_v1
        app.register_blueprint(api_v1)

        return app


def create_tables():
    from .db_models.user import User, UserFavorites, MembershipList, IdentityType
    from .db_models.banking import Transaction, TransactionAuditLog, Account, AccountUser, AccountType
    from .db_models.gig import GigList, GigStatus, GigCategoryNames
    from .db_models.message import Message, MessageStatus, ConversationMessage, Conversation

    db.create_all()
