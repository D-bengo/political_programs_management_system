from server.config import db


class Stakeholder(db.Model):

    __tablename__ = "stakeholders"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)

    position = db.Column(db.String)

    county = db.Column(db.String)

    phone = db.Column(db.String)

    attendances = db.relationship(
        "Attendance",
        back_populates="stakeholder",
        cascade="all, delete"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "position": self.position,
            "county": self.county,
            "phone": self.phone
        }