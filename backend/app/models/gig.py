from .. import db
from ..models.user import Users


class GigCategoryNames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class GigStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)


class GigList(db.Model):
    id = db.Column(db.UUID, primary_key=True)  # TODO: Fancy idea of using UUID as id, can be changed to int
    payout = db.Column(db.Integer)
    title = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.ForeignKey(GigCategoryNames.id))
    reputationRequired = db.Column(db.Integer, nullable=True)
    status = db.Column(db.ForeignKey(GigStatus.id))
    author = db.Column(db.ForeignKey(Users.id))  # TODO: What if user want to post it with different handle?
    takenBy = db.Column(db.ForeignKey(Users.id), nullable=True)  # TODO: What if user want to use different handle?
