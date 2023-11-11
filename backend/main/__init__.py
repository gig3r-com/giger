from flask import Flask
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
socketio = SocketIO(app)
db = SQLAlchemy()
migrate = Migrate(app, db)


def create_app(db_init=False):
    app.config.from_object('config')

    with app.app_context():
        db.init_app(app)
        migrate.init_app(app)
        if db_init:
            create_tables()
        from .routes.user_endpoints import user_endpoints
        from .routes.gig_endpoints import gig_endpoints
        app.register_blueprint(user_endpoints)
        app.register_blueprint(gig_endpoints)

        return app


def create_tables():
    from .db_models.user import User, UserFavorites, IdentityType, AffiliationList
    from .db_models.banking import Transaction, TransactionAuditLog, Account, AccountUser, AccountType
    from .db_models.gig import Gig, GigStatus, GigCategoryNames
    from .db_models.message import Message, MessageStatus, ConversationMessage, Conversation

    db.create_all()

    # TODO: External package with static data needs to be provided. Issue with double inserting values on dev server.

    # db.session.add(IdentityType(name="human"))
    # db.session.add(IdentityType(name="ai"))
    # db.session.add(IdentityType(name="android"))
    #
    # db.session.add(AffiliationList(name="Overseers"))
    # db.session.add(AffiliationList(name="Dizorders"))
    # db.session.add(AffiliationList(name="Hedonizers"))
    # db.session.add(AffiliationList(name="S.W.A.R.M"))
    # db.session.add(AffiliationList(name="DigiEvo"))
    #
    # db.session.add(MessageStatus(name="sent"))
    # db.session.add(MessageStatus(name="received"))
    # db.session.add(MessageStatus(name="read"))
    # db.session.add(MessageStatus(name="error"))
    # db.session.add(MessageStatus(name="awaiting"))
    #
    # db.session.add(GigCategoryNames(name="relation"))
    # db.session.add(GigCategoryNames(name="combat"))
    # db.session.add(GigCategoryNames(name="tech"))
    # db.session.add(GigCategoryNames(name="info"))
    # db.session.add(GigCategoryNames(name="courier"))
    # db.session.add(GigCategoryNames(name="medical"))
    # db.session.add(GigCategoryNames(name="hacking"))
    # db.session.add(GigCategoryNames(name="weapons"))
    # db.session.add(GigCategoryNames(name="drugs"))
    #
    # db.session.add(GigStatus(name="available"))
    # db.session.add(GigStatus(name="in_progress"))
    # db.session.add(GigStatus(name="completed"))
    # db.session.add(GigStatus(name="pending"))
    #
    # db.session.commit()
