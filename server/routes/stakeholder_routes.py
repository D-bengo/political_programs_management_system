from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.models.stakeholder import Stakeholder
from server.models.user import User
from server.config import db

stakeholder_bp = Blueprint(
    "stakeholder_bp",
    __name__
)


def admin_required():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user or user.role != "Admin":
        return None

    return user


# GET - Admin and Coordinator
@stakeholder_bp.route("/stakeholders", methods=["GET"])
@jwt_required()
def get_stakeholders():

    stakeholders = Stakeholder.query.all()

    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "position": s.position,
            "county": s.county,
            "phone": s.phone
        }
        for s in stakeholders
    ])


# CREATE - Admin only
@stakeholder_bp.route("/stakeholders", methods=["POST"])
@jwt_required()
def create_stakeholder():

    if not admin_required():
        return jsonify({
            "error": "Admins only"
        }), 403

    data = request.get_json()

    stakeholder = Stakeholder(
        name=data["name"],
        position=data["position"],
        county=data["county"],
        phone=data["phone"]
    )

    db.session.add(stakeholder)
    db.session.commit()

    return jsonify({
        "message": "Stakeholder created successfully"
    }), 201


# UPDATE - Admin only
@stakeholder_bp.route("/stakeholders/<int:id>", methods=["PATCH"])
@jwt_required()
def update_stakeholder(id):

    if not admin_required():
        return jsonify({
            "error": "Admins only"
        }), 403

    stakeholder = Stakeholder.query.get_or_404(id)

    data = request.get_json()

    stakeholder.name = data.get(
        "name",
        stakeholder.name
    )

    stakeholder.position = data.get(
        "position",
        stakeholder.position
    )

    stakeholder.county = data.get(
        "county",
        stakeholder.county
    )

    stakeholder.phone = data.get(
        "phone",
        stakeholder.phone
    )

    db.session.commit()

    return jsonify({
        "message": "Stakeholder updated successfully"
    })


# DELETE - Admin only
@stakeholder_bp.route("/stakeholders/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_stakeholder(id):

    if not admin_required():
        return jsonify({
            "error": "Admins only"
        }), 403

    stakeholder = Stakeholder.query.get_or_404(id)

    db.session.delete(stakeholder)
    db.session.commit()

    return jsonify({
        "message": "Stakeholder deleted successfully"
    })