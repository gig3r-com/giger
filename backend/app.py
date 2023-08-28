from app import create_app, socketio, db
from app.models.user import Users
from app.models.banking import Transaction, TransactionAuditLog, AccountType, Account, AccountUser
from app.models.gig import GigList, GigStatus, GigCategoryNames
from app.models.message import Message, ConversationMessage, Conversation, MessageStatus

app = create_app(debug=True)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        db.session.commit()
    socketio.run(app)
