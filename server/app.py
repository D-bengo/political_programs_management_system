from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config, db

from models import User, Program, Stakeholder, Attendance, Report

from routes.auth_routes import auth_bp
from routes.program_routes import program_bp
from routes.stakeholder_routes import stakeholder_bp
from routes.attendance_routes import attendance_bp
from routes.report_routes import report_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    # ✅ FIXED CORS (NO TYPOS, NO MISTAKES)
    CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    app.register_blueprint(auth_bp)
    app.register_blueprint(program_bp)
    app.register_blueprint(stakeholder_bp)
    app.register_blueprint(attendance_bp)
    app.register_blueprint(report_bp)

    @app.route("/")
    def home():
        return {"message": "API Running Successfully"}, 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)