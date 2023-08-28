from .. import db
from ..models.user import Users


class MessageStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    status = db.Column(db.String)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    date = db.Column(db.DateTime)
    sender = db.Column(db.ForeignKey(Users.id))
    text = db.Column(db.String)
    status = db.Column(db.ForeignKey(MessageStatus.id), nullable=True)


class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.ForeignKey(Message.id))


class ConversationMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.ForeignKey(Conversation.id))
    message_id = db.Column(db.ForeignKey(Message.id))
