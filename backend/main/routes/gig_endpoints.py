import logging
from flask import jsonify, Blueprint, request
from ..db_models.gig import allowed_params, get_all_gigs, create_gig, get_gig_by_id, delete_gig_by_id
from ..routes.securitycheck import basic_auth_required

gig_endpoints = Blueprint('gig_endpoints', __name__, url_prefix='/api/v1')


def gig_post(post_request):
    if post_request.content_type == 'application/json':

        json_data = post_request.json
        for key in json_data.keys():
            if key not in allowed_params():
                return jsonify({
                    "error": f"wrong parameter {key}"
                }), 400

        new_gig = create_gig(post_request.json)

        return jsonify({
            "message": f"gig created",
            "id": new_gig
        }), 201

    else:
        return jsonify({
            "message": "request empty or wrong content_type"
        }), 404


def gig_get(gig_id):
    requested_gig = get_gig_by_id(gig_id)

    if requested_gig is None:
        return jsonify({
            "message": "No gigs found"
        }), 404
    else:
        return jsonify(requested_gig.to_dict()), 201


def gig_delete(gig_id):
    delete_gig_by_id(gig_id)

    return jsonify({
        "message": "gig deleted",
        "id": gig_id
    }), 200


@gig_endpoints.route('/gig', methods=['POST'])
@basic_auth_required
def gig_create():
    if request.method == 'POST':
        return gig_post(request)


@gig_endpoints.route('/gig/<int:gig_id>', methods=['GET', 'DELETE'])
@basic_auth_required
def gig_by_id(gig_id):
    if request.method == 'GET':
        return gig_get(gig_id)

    elif request.method == 'DELETE':
        return gig_delete(gig_id)


@gig_endpoints.route('/gig/all', methods=['GET'])
@basic_auth_required
def gigs_all():
    gigs = get_all_gigs()
    gig_list = []
    for gig in gigs:
        gig_list.append(gig.to_dict())
    return jsonify(gig_list)
