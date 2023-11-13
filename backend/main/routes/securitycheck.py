from functools import wraps
from flask import request, Response
from ..db_models.user import get_user_phash
import base64


def basic_auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if auth:

            handle, basic_phash = auth.parameters.values()
            stored_phash = get_user_phash(handle)

            if basic_phash != stored_phash:
                return Response('Unauthorized', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
        else:
            return Response('Bad Request', 400, {'WWW-Authenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)

    return decorated
