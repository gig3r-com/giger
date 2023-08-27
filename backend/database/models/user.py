from backend.app import db
import sqlalchemy as sa


class Users(db.Model):
    sa.Column("id", sa.Integer, primary_key=True, nullable=False)
    sa.Column("name", sa.String, nullable=False)
    sa.Column("parent_id", sa.Integer, nullable=False)
    sa.Column("reputation", sa.Integer)
