from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from server.models.user import User
from server.config import db

auth_bp = Blueprint("auth_bp", __name__)

# Register
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    user = User(
        name=data["name"],
        email=data["email"],
        role=data["role"]
    )

    user.password = data["password"]

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully"
    }), 201


# Login
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:
        return jsonify({
            "error": "Invalid credentials"
        }), 401

    if not user.authenticate(data["password"]):
        return jsonify({
            "error": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role
        }
    }), 200