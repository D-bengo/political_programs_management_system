from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.attendance import Attendance
from models.user import User
from config import db

attendance_bp = Blueprint(
    "attendance_bp",
    __name__
)


def admin_required():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user or user.role != "Admin":
        return None

    return user


# GET - Admin and Coordinator
@attendance_bp.route("/attendance", methods=["GET"])
@jwt_required()
def get_attendance():

    attendance = Attendance.query.all()

    return jsonify([
        {
            "id": a.id,
            "program_id": a.program_id,
            "stakeholder_id": a.stakeholder_id,
            "status": a.status
        }
        for a in attendance
    ])


# MARK ATTENDANCE - Admin only
@attendance_bp.route("/attendance", methods=["POST"])
@jwt_required()
def mark_attendance():

    if not admin_required():
        return jsonify({
            "error": "Admins only"
        }), 403

    data = request.get_json()

    attendance = Attendance(
        program_id=data["program_id"],
        stakeholder_id=data["stakeholder_id"],
        status=data["status"]
    )

    db.session.add(attendance)
    db.session.commit()

    return jsonify({
        "message": "Attendance marked successfully"
    }), 201