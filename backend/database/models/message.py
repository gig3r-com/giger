from backend.app import db
import sqlalchemy as sa
from user import Users


class MessageStatus(db.Model):
    sa.Column("id", sa.Integer, primary_key=True, unique=True)
    sa.Column("status", sa.String)


class Message(db.Model):
    sa.Column("id", sa.Integer, primary_key=True, unique=True)
    sa.Column("date", sa.DateTime)
    sa.Column("sender", sa.ForeignKey(Users.name))
    sa.Column("text", sa.String)
    sa.Column("status", sa.ForeignKey(MessageStatus.id), nullable=True)


class Conversation(db.Model):
    sa.Column("id", sa.Integer, primary_key=True)
    sa.Column("message", sa.ForeignKey(Message.id))


class ConversationMessage(db.Model):
    sa.Column("conversation_id", sa.ForeignKey(Conversation.id))
    sa.Column("message_id", sa.ForeignKey(Message.id))
