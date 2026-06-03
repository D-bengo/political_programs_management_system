from config import db


class Program(db.Model):

    __tablename__ = "programs"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String)

    description = db.Column(db.String)

    venue = db.Column(db.String)

    region = db.Column(db.String)

    status = db.Column(db.String)

    date = db.Column(db.Date)

    coordinator_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    coordinator = db.relationship(
        "User",
        back_populates="programs"
    )

    attendances = db.relationship(
        "Attendance",
        back_populates="program",
        cascade="all, delete"
    )

    reports = db.relationship(
        "Report",
        back_populates="program",
        cascade="all, delete"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "venue": self.venue,
            "region": self.region,
            "status": self.status,
            "coordinator_id": self.coordinator_id
        }