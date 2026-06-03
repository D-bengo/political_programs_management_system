from config import db


class Attendance(db.Model):

    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    status = db.Column(db.String)

    program_id = db.Column(
        db.Integer,
        db.ForeignKey("programs.id")
    )

    stakeholder_id = db.Column(
        db.Integer,
        db.ForeignKey("stakeholders.id")
    )

    program = db.relationship(
        "Program",
        back_populates="attendances"
    )

    stakeholder = db.relationship(
        "Stakeholder",
        back_populates="attendances"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "status": self.status,
            "program_id": self.program_id,
            "stakeholder_id": self.stakeholder_id
        }