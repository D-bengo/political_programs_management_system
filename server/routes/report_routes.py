from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from server.models.report import Report
from server.config import db

report_bp = Blueprint(
    "report_bp",
    __name__
)

# GET REPORTS
@report_bp.route(
    "/reports",
    methods=["GET"]
)
@jwt_required()
def get_reports():

    reports = Report.query.all()

    return jsonify([
        {
            "id": r.id,
            "summary": r.summary
        }
        for r in reports
    ])


# CREATE REPORT
@report_bp.route(
    "/reports",
    methods=["POST"]
)
@jwt_required()
def create_report():

    data = request.get_json()

    report = Report(
        summary=data["summary"],
        recommendations=data["recommendations"],
        program_id=data["program_id"]
    )

    db.session.add(report)
    db.session.commit()

    return jsonify({
        "message": "Report submitted"
    }), 201


# DELETE REPORT
@report_bp.route(
    "/reports/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_report(id):

    report = Report.query.get_or_404(id)

    db.session.delete(report)
    db.session.commit()

    return jsonify({
        "message": "Report deleted"
    })