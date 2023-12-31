from flask import jsonify
from flask import Blueprint
from ..data_models.user_data_model import UserDataModel
from ..routes.securitycheck import basic_auth_required

user_endpoints = Blueprint('user_endpoints', __name__, url_prefix='/api/v1')


@user_endpoints.route('/user/<int:user_id>')
@basic_auth_required
def get_user(user_id):
    user = UserDataModel().get_full_user_details_by_id(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 200


@user_endpoints.route('/user/all')
@basic_auth_required
def get_all():
    user_list = UserDataModel().get_all_users()

    if len(user_list) > 0:
        return jsonify(user_list)
    else:
        return jsonify({"error": "Users not found"}), 200
