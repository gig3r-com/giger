from ..app import db
import sqlalchemy as sa
from user import User

class Transaction(db.Model):
    sa.Column("id", sa.String, primary_key=True)
    sa.Column("to", sa.ForeignKey(User.id))
    sa.Column("from", sa.ForeignKey(User.id))
    sa.Column("amount", sa.Integer) # TODO: Change type if currency will contain  
