from functools import wraps
from flask import request, Response, jsonify
from ..db_models.user import get_user_phash
import base64


def basic_auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if auth:

            handle, basic_phash = auth.parameters.values()

            if handle is None or basic_phash is None:
                return jsonify({
                    "message": "login or password incorrect"
                }), 401

            stored_phash = get_user_phash(handle)

            if stored_phash is None or basic_phash != stored_phash:
                return jsonify({
                    "message": "login or password incorrect"
                }), 401
        else:
            return Response('Unauthorized', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)

    return decorated
