from .. import db
from ..models.user import Users
from ..models.gig import GigList


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # TODO: Doublecheck with team if transaction id will be visible
    recipient = db.Column(db.ForeignKey(Users.id))
    sender = db.Column(db.ForeignKey(Users.id))
    amount = db.Column(db.Integer)  # TODO: Change type to Float if minor currency unit will be introduced
    date = db.Column(db.DateTime)
    gig_id = db.Column(db.ForeignKey(GigList.id))


class AccountType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)


class Account(db.Model):
    id = db.Column(db.String, primary_key=True)
    owner = db.Column(db.ForeignKey(Users.id))
    type = db.Column(db.ForeignKey(AccountType.id))


class TransactionAuditLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.ForeignKey(Transaction.id), nullable=False)
    to_account_id = db.Column(db.ForeignKey(Account.id))
    from_account_id = db.Column(db.ForeignKey(Account.id))
    date = db.Column(db.DateTime)


class AccountUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.ForeignKey(Account.id))
    user_id = db.Column(db.ForeignKey(Users.id))
