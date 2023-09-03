from .. import db


class MembershipList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class IdentityType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    handle = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    membership = db.Column(db.ForeignKey(MembershipList.id))
    identity = db.Column(db.ForeignKey(IdentityType.id))
    hacking_lvl = db.Column(db.Integer, nullable=True)
    reputation = db.Column(db.Integer, nullable=True)
    parent_id = db.Column(db.Integer, nullable=True)


class UserFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.id))
    favorite_user_id = db.Column(db.ForeignKey(User.id))
