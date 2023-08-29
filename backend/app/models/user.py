from .. import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    parent_id = db.Column(db.Integer, nullable=True)
    reputation = db.Column(db.Integer, nullable=True)
