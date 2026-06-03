from app import app
from config import db

from models import (
    User,
    Program,
    Stakeholder,
    Attendance,
    Report
)

from datetime import date

with app.app_context():

    print("Deleting existing records...")

    Attendance.query.delete()
    Report.query.delete()
    Program.query.delete()
    Stakeholder.query.delete()
    User.query.delete()

    db.session.commit()

    print("Creating users...")

    admin = User(
        name="System Admin",
        email="admin@ppms.com",
        role="Admin"
    )
    admin.password = "admin123"

    coordinator1 = User(
        name="John Mwangi",
        email="john@ppms.com",
        role="Coordinator"
    )
    coordinator1.password = "password123"

    coordinator2 = User(
        name="Jane Wanjiku",
        email="jane@ppms.com",
        role="Coordinator"
    )
    coordinator2.password = "password123"

    db.session.add_all([
        admin,
        coordinator1,
        coordinator2
    ])

    db.session.commit()

    print("Creating programs...")

    program1 = Program(
        title="Youth Empowerment Forum",
        description="Youth engagement program",
        venue="Nairobi",
        region="Nairobi County",
        status="Upcoming",
        date=date(2026, 6, 15),
        coordinator_id=coordinator1.id
    )

    program2 = Program(
        title="Coastal Economic Forum",
        description="Economic development discussion",
        venue="Mombasa",
        region="Mombasa County",
        status="Completed",
        date=date(2026, 5, 20),
        coordinator_id=coordinator2.id
    )

    db.session.add_all([
        program1,
        program2
    ])

    db.session.commit()

    print("Creating stakeholders...")

    stakeholder1 = Stakeholder(
        name="Peter Ochieng",
        position="MCA",
        county="Kisumu",
        phone="0711111111"
    )

    stakeholder2 = Stakeholder(
        name="Grace Njeri",
        position="Youth Leader",
        county="Nairobi",
        phone="0722222222"
    )

    stakeholder3 = Stakeholder(
        name="David Kiptoo",
        position="Governor Representative",
        county="Uasin Gishu",
        phone="0733333333"
    )

    db.session.add_all([
        stakeholder1,
        stakeholder2,
        stakeholder3
    ])

    db.session.commit()

    print("Creating attendance records...")

    attendance1 = Attendance(
        status="Present",
        program_id=program1.id,
        stakeholder_id=stakeholder1.id
    )

    attendance2 = Attendance(
        status="Present",
        program_id=program1.id,
        stakeholder_id=stakeholder2.id
    )

    attendance3 = Attendance(
        status="Absent",
        program_id=program2.id,
        stakeholder_id=stakeholder3.id
    )

    db.session.add_all([
        attendance1,
        attendance2,
        attendance3
    ])

    db.session.commit()

    print("Creating reports...")

    report1 = Report(
        summary="Youth forum was successful.",
        recommendations="Increase participation next time.",
        program_id=program1.id
    )

    report2 = Report(
        summary="Economic forum completed.",
        recommendations="More stakeholder engagement required.",
        program_id=program2.id
    )

    db.session.add_all([
        report1,
        report2
    ])

    db.session.commit()

    print("Database seeded successfully!")