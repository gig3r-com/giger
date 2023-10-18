import json
from flask import jsonify, Blueprint, request
from ..data_models.gig_data_model import GigDataModel

gig_endpoints = Blueprint('gig_endpoints', __name__, url_prefix='/api/v1')


@gig_endpoints.route('/gig', methods=['POST', 'GET'])
def gig():
    if request.method == 'POST':

        allowed_params = dict(GigDataModel.__annotations__)

        if request.content_type == 'application/json':

            json_data = request.json
            for key in json_data.keys():
                if key not in allowed_params.keys():
                    return jsonify({
                        "error": f"wrong parameter {key}"
                    }), 400

                allowed_params.pop(key)

            if len(allowed_params) > 0:
                return jsonify({
                    "error": f"parameters missing:{allowed_params}"
                })

            new_gig = GigDataModel(request.json)

            return jsonify({
                "message": "gig creation successfull"
            }), 201

    elif request.method == 'GET':
        return "Gig list"
