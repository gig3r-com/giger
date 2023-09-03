from .. import db
from ..db_models.user import User


class GigCategoryNames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class GigStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)


class GigList(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # TODO: Fancy idea of using UUID as id, can be changed to int
    amount = db.Column(db.Integer)
    title = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.ForeignKey(GigCategoryNames.id))
    reputation_required = db.Column(db.Integer, nullable=True)
    status = db.Column(db.ForeignKey(GigStatus.id))
    opened_by = db.Column(db.ForeignKey(User.id))  # TODO: What if user want to post it with different handle?
    taken_by = db.Column(db.ForeignKey(User.id), nullable=True)  # TODO: What if user want to use different handle?
