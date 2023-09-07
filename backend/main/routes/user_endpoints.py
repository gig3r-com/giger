from flask import jsonify
from ..db_models.user import User
from flask import Blueprint
from typing import List, Dict

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1')


@api_v1.route('/users/backdoor/handles/<string:user_name>')
def get_user(user_name):
    user = User.query.filter(User.handle == user_name).first()
    if user:
        users = User.query.filter(User.parent_id == user.id).all()
        if len(users) > 0:
            return jsonify(convert_user_list(users))
        else:
            return jsonify({"error": "No handles found"}), 200
    else:
        return jsonify({"error": "User not found"}), 200


@api_v1.route('/users')
def get_all():
    users = User.query.all()
    user_list = []

    for user in users:
        user_list.append({"name": user.name})

    if len(users) > 0:
        return jsonify(user_list)
    else:
        return jsonify({"error": "Users not found"}), 200


@api_v1.route('/users/backdoor/handles/all')
def get_all_handles():
    users = User.query.filter(User.parent_id.isnot(None)).all()
    if users:
        return jsonify(convert_user_list(users))
    else:
        return jsonify({"error": "No handles found"}), 200


def convert_user_to_dict(user: User, *, expose=False) -> Dict:
    if expose:
        return {"id": user.id, "name": user.name, "parent_id": user.parent_id}
    else:
        return {"name": user.name}


def convert_user_list(users: List[User]) -> List[Dict]:
    user_list = []
    for user in users:
        user_list.append(convert_user_to_dict(user))
    return user_list
