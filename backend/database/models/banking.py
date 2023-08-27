from backend.app import db
import sqlalchemy as sa
from user import Users
from gig import GigList


class Transaction(db.Model):
    sa.Column("id", sa.Integer, primary_key=True)  # TODO: Doublecheck with team if transaction id will be visible
    sa.Column("to", sa.ForeignKey(Users.name))
    sa.Column("from", sa.ForeignKey(Users.name))
    sa.Column("amount", sa.Integer)  # TODO: Change type to Float if minor currency unit will be introduced
    sa.Column("date", sa.DateTime)
    sa.Column("gig_id", sa.ForeignKey(GigList.id))


class AccountType(db.Model):
    sa.Column("id", sa.Integer, primary_key=True)
    sa.Column("type", sa.String)


class Account(db.Model):
    sa.Column("id", sa.String, primary_key=True)
    sa.Column("owner", sa.ForeignKey(Users.id))
    sa.Column("type", sa.ForeignKey(AccountType.id))


class TransactionAuditLog(db.Model):
    sa.Column("transaction_id", sa.Integer)
    sa.Column("to_account_id", sa.ForeignKey(Account.id))
    sa.Column("from_account_id", sa.ForeignKey(Account.id))
    sa.Column("date", sa.DateTime)


class AccountUser(db.Model):
    sa.Column("account_id", sa.ForeignKey(Account.id))
    sa.Column("user_id", sa.ForeignKey(Users.id))
