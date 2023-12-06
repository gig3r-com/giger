import click
from flask import Flask
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask.cli import AppGroup
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app)
db = SQLAlchemy()
migrate = Migrate(app, db)
CORS(app, origins=['https://gig3r.com'])
custom_cli = AppGroup('init', short_help='Perform initial operations.')


def create_app():
    app.config.from_object('config')
    # import models so they are known to flask-migrate
    from .db_models import banking, gig, message, user
    with app.app_context():
        db.init_app(app)
        migrate.init_app(app)
        from .routes.user_endpoints import user_endpoints
        from .routes.gig_endpoints import gig_endpoints
        app.register_blueprint(user_endpoints)
        app.register_blueprint(gig_endpoints)
        app.cli.add_command(custom_cli)

        return app


@custom_cli.command('database', short_help='Initializes tables from scratch')
def create_tables():
    with app.app_context():
        from .db_models.user import User, UserFavorites, IdentityType, AffiliationList, Authorization
        from .db_models.banking import Transaction, TransactionAuditLog, Account, AccountUser, AccountType
        from .db_models.gig import Gig, GigStatus, GigCategoryNames
        from .db_models.message import Message, MessageStatus, ConversationMessage, Conversation

        db.create_all()
    click.echo('Database initialized successfully!')


@custom_cli.command('staticdata', short_help='Loads staticdata like affiliations and types')
def load_static_data():
    with app.app_context():
        from .db_models.user import User, UserFavorites, IdentityType, AffiliationList, Authorization
        from .db_models.banking import Transaction, TransactionAuditLog, Account, AccountUser, AccountType
        from .db_models.gig import Gig, GigStatus, GigCategoryNames
        from .db_models.message import Message, MessageStatus, ConversationMessage, Conversation

        db.session.add(IdentityType(name="human"))
        db.session.add(IdentityType(name="ai"))
        db.session.add(IdentityType(name="android"))

        db.session.add(AffiliationList(name="Overseers"))
        db.session.add(AffiliationList(name="Dizorders"))
        db.session.add(AffiliationList(name="Hedonizers"))
        db.session.add(AffiliationList(name="S.W.A.R.M"))
        db.session.add(AffiliationList(name="DigiEvo"))

        db.session.add(MessageStatus(name="sent"))
        db.session.add(MessageStatus(name="received"))
        db.session.add(MessageStatus(name="read"))
        db.session.add(MessageStatus(name="error"))
        db.session.add(MessageStatus(name="awaiting"))

        db.session.add(GigCategoryNames(name="relation"))
        db.session.add(GigCategoryNames(name="combat"))
        db.session.add(GigCategoryNames(name="tech"))
        db.session.add(GigCategoryNames(name="info"))
        db.session.add(GigCategoryNames(name="courier"))
        db.session.add(GigCategoryNames(name="medical"))
        db.session.add(GigCategoryNames(name="hacking"))
        db.session.add(GigCategoryNames(name="weapons"))
        db.session.add(GigCategoryNames(name="drugs"))

        db.session.add(GigStatus(name="available"))
        db.session.add(GigStatus(name="in_progress"))
        db.session.add(GigStatus(name="completed"))
        db.session.add(GigStatus(name="pending"))

        db.session.commit()

        click.echo('Static data load completed')


@custom_cli.command('backdoor', short_help='Loads test user for DEV only')
def load_test_user():
    with app.app_context():
        from .db_models.user import User
        from .db_models.user import Authorization, AffiliationList, IdentityType

        authorization = Authorization(phash="$2b$12$xrPXbLWK02AuE1D2Cv8gkuuf5DWD8ViIA1GkE98mAbJr8mGUnoa5G") # "password"

        db.session.add(authorization)

        new_user = User(
            first_name="John",
            last_name="Poe",
            handle="john_poe",
            phash=authorization,
            alias="JP",
            age=103,
            cyberware_percentage=100
        )

        db.session.add(new_user)

        db.session.commit()

        click.echo('IF(PROD): THIS IS BAD.')
