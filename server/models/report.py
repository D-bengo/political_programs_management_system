from server.config import db


class Report(db.Model):

    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    summary = db.Column(db.Text)

    recommendations = db.Column(db.Text)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    program_id = db.Column(
        db.Integer,
        db.ForeignKey("programs.id")
    )

    program = db.relationship(
        "Program",
        back_populates="reports"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "summary": self.summary,
            "recommendations": self.recommendations,
            "program_id": self.program_id,
            "created_at": self.created_at
        }