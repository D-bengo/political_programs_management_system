from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.program import Program
from config import db

program_bp = Blueprint(
    "program_bp",
    __name__
)

# GET ALL PROGRAMS
@program_bp.route("/programs", methods=["GET"])
@jwt_required()
def get_programs():

    programs = Program.query.all()

    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "venue": p.venue,
            "region": p.region
        }
        for p in programs
    ])


# CREATE PROGRAM
@program_bp.route("/programs", methods=["POST"])
@jwt_required()
def create_program():

    data = request.get_json()

    program = Program(
        title=data["title"],
        description=data["description"],
        venue=data["venue"],
        region=data["region"],
        coordinator_id=data["coordinator_id"]
    )

    db.session.add(program)
    db.session.commit()

    return jsonify({
        "message": "Program created"
    }), 201


# UPDATE PROGRAM
@program_bp.route("/programs/<int:id>", methods=["PATCH"])
@jwt_required()
def update_program(id):

    program = Program.query.get_or_404(id)

    data = request.get_json()

    program.title = data.get(
        "title",
        program.title
    )

    program.description = data.get(
        "description",
        program.description
    )

    db.session.commit()

    return jsonify({
        "message": "Program updated"
    })


# DELETE PROGRAM
@program_bp.route("/programs/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_program(id):

    program = Program.query.get_or_404(id)

    db.session.delete(program)
    db.session.commit()

    return jsonify({
        "message": "Program deleted"
    })