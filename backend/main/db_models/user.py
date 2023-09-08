from .. import db


class AffiliationList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class IdentityType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    handle = db.Column(db.String, nullable=False, unique=True)
    alias = db.Column(db.String)
    age = db.Column(db.Integer)
    cyberware_percentage = db.Column(db.Integer)
    affiliation = db.Column(db.ForeignKey(AffiliationList.id))
    profession = db.Column(db.String)  # TODO: Introduce separate table
    insurance = db.Column(db.Boolean)
    identity = db.Column(db.ForeignKey(IdentityType.id))
    id_valid_to = db.Column(db.Date)
    hacking_lvl = db.Column(db.Integer, nullable=True)
    reputation = db.Column(db.Integer, nullable=True)

    affiliation_name = db.relationship("AffiliationList", backref='user')
    identity_name = db.relationship("IdentityType", backref='user')


class UserFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(User.id))
    favorite_user_id = db.Column(db.ForeignKey(User.id))
