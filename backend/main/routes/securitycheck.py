from functools import wraps
from flask import request, Response, jsonify
from ..db_models.user import get_user_phash
import bcrypt

BCRYPT_SALT_ROUNDS = 14


def basic_auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if auth:

            handle, password = auth.parameters.values()

            if handle is None or password is None:
                return jsonify({
                    "message": "login or password incorrect"
                }), 401

            stored_phash = get_user_phash(handle)

            if stored_phash is None or bcrypt.checkpw(password.encode('UTF-8'), stored_phash.encode('UTF-8')):
                return jsonify({
                    "message": "login or password incorrect"
                }), 401
        else:
            return Response('Unauthorized', 401)
        return f(*args, **kwargs)

    return decorated
