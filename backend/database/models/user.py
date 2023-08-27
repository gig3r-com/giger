from ..app import db
import sqlalchemy as sa


class User(db.Model):
    id = sa.Column(sa.String, primary_key=True)
    name = sa.Column(sa.String)
    handle = sa.Column(sa.String)
