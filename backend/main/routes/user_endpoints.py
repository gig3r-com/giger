from flask import Blueprint, jsonify
from backend.app.models.user import Users

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1')


@api_v1.route('/users/<int:user_id>')
def users(user_id):
    user = Users.query.get_or_404(user_id)
    return jsonify({"name": user.name})