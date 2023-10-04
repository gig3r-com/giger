from flask import jsonify

from ..data_models.userdata import UserData
from flask import Blueprint

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1')


@api_v1.route('/users/<int:user_id>')
def get_user(user_id):
    user = UserData().get_full_user_details_by_id(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 200


@api_v1.route('/users')
def get_all():
    user_list = UserData().get_all_users()

    if len(user_list) > 0:
        return jsonify(user_list)
    else:
        return jsonify({"error": "Users not found"}), 200
