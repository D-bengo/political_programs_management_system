from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config, db

# IMPORTANT: import models so Flask-Migrate can detect them
from models import User, Program, Stakeholder, Attendance, Report

# Import Blueprints (VERY IMPORTANT - you were missing this)
from routes.auth_routes import auth_bp
from routes.program_routes import program_bp
from routes.stakeholder_routes import stakeholder_bp
from routes.attendance_routes import attendance_bp
from routes.report_routes import report_bp


def create_app():

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)

    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://political-programs-management-syste.vercel.app"
            ]
        }
    },
    supports_credentials=True
)

    # Register Blueprints
    app.register_blueprint(auth_bp)

    app.register_blueprint(program_bp)

    app.register_blueprint(stakeholder_bp)

    app.register_blueprint(attendance_bp)

    app.register_blueprint(report_bp)

    # Home Route
    @app.route("/")
    def home():
        return {
            "message": "Political Programs Management System API"
        }, 200

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5555
    )