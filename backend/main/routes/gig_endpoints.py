import logging
from flask import jsonify, Blueprint, request
from ..db_models.gig import Gig, get_all_gigs

gig_endpoints = Blueprint('gig_endpoints', __name__, url_prefix='/api/v1')


@gig_endpoints.route('/gig', methods=['POST', 'GET'])
def gig():
    if request.method == 'POST':

        allowed_params = Gig.allowed_params()

        if request.content_type == 'application/json':

            json_data = request.json
            for key in json_data.keys():
                if key not in allowed_params:
                    return jsonify({
                        "error": f"wrong parameter {key}"
                    }), 400

            new_gig = Gig.create_gig(request.json)

            return jsonify({
                "message": f"gig created",
                "id": new_gig
            }), 201

    elif request.method == 'GET':

        if len(request.args) > 1:
            return jsonify({
                "error": "too many parameters"
            }), 400

        requested_gig = Gig.query.filter_by(id=request.args.get("id")).first()
        return jsonify(requested_gig.to_dict()), 201


@gig_endpoints.route('/gig/all', methods=['GET'])
def all_gigs():
    all_gigs = get_all_gigs()
    gig_list = []
    for gig in all_gigs:
        gig_list.append(gig.to_dict())
    return jsonify(gig_list)
