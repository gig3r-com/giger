from backend.app import db
import sqlalchemy as sa
from user import Users


class GigCategoryNames(db.Model):
    sa.Column("id", sa.Integer, primary_key=True)
    sa.Column("name", sa.String)


class GigStatus(db.Model):
    sa.Column("id", sa.Integer, primary_key=True)
    sa.Column("status", sa.String)


class GigList(db.Model):
    sa.Column("id", sa.UUID, primary_key=True)  # TODO: Fancy idea of using UUID as id, can be changed to int
    sa.Column("payout", sa.Integer)
    sa.Column("title", sa.String)
    sa.Column("description", sa.String)
    sa.Column("category", sa.ForeignKey(GigCategoryNames.id))
    sa.Column("reputationRequired", sa.Integer, nullable=True)
    sa.Column("status", sa.ForeignKey(GigStatus.id))
    sa.Column("author", sa.ForeignKey(Users.name))  # TODO: What if user want to post it with different handle?
    sa.Column("takenBy", sa.ForeignKey(Users.name), nullable=True)  # TODO: What if user want to use different handle?
