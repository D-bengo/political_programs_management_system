from server.config import db
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(db.String)

    role = db.Column(db.String(50))

    programs = db.relationship(
        "Program",
        back_populates="coordinator"
    )

    @property
    def password(self):
        raise AttributeError(
            "Password cannot be viewed"
        )

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(
            password
        ).decode("utf-8")

    def authenticate(self, password):
        return check_password_hash(
            self.password_hash,
            password
        )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }