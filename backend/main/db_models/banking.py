from .. import db
from ..db_models.user import User
from ..db_models.gig import Gig


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    to_user = db.Column(db.ForeignKey(User.id))
    from_user = db.Column(db.ForeignKey(User.id))
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    gig_id = db.Column(db.ForeignKey(Gig.id), nullable=True)


class AccountType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)


class Account(db.Model):
    id = db.Column(db.String, primary_key=True)
    type = db.Column(db.ForeignKey(AccountType.id))
    balance = db.Column(db.Integer, nullable=False)


class TransactionAuditLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.ForeignKey(Transaction.id), nullable=False)
    to_account_id = db.Column(db.ForeignKey(Account.id))
    from_account_id = db.Column(db.ForeignKey(Account.id), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)


class AccountUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.ForeignKey(Account.id))
    user_id = db.Column(db.ForeignKey(User.id))
