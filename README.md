## Political Programs Management System
## Project Overview
- The Political Programs Management System is a full-stack web application designed to support the management of political programs, stakeholders, attendance records, and reports within a political affairs department.

- The system provides secure authentication, role-based access control, program management, stakeholder management, attendance tracking, and report submission functionalities. It was developed using React for the frontend and Flask for the backend.

## Problem Statement
- Political programs often involve multiple stakeholders, coordinators, and administrators. Managing these activities manually can lead to inefficiencies, poor record keeping, and difficulties in monitoring attendance and program outcomes.

- This system digitizes the management process by providing a centralized platform where administrators can create and manage programs while coordinators can monitor activities and submit reports.

## Objectives
- The system aims to:
    - Manage political programs efficiently.
    - Track stakeholder participation.
    - Record attendance for political events.
    - Allow coordinators to submit program reports.
    - Provide secure authentication and authorization.
    - Maintain accurate program records and reporting.

## Technologies Used
1. ## Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- SweetAlert2

2. ## Backend
- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- Flask Migrate
- Flask CORS
- Flask Bcrypt

3. ## Database
- SQLite

4. ## Authentication
- The system uses JWT (JSON Web Tokens) for authentication.
- Users can:
    - Register
    - Login
    - Logout
- Protected routes require a valid JWT token.

## User Roles
1. ## Admin
- The administrator has full access to the system and can:
    - Create programs
    - Update programs
    - Delete programs
    - Add stakeholders
    - Update stakeholders
    - Delete stakeholders
    - Mark attendance
    - View all reports
    - Manage political activities

2. ## Coordinator
- The coordinator can:
    - View assigned programs
    - View stakeholders
    - View attendance records
    - Submit reports
    - View submitted reports

## INSTALLATION GUIDE
## Backend Setup
1. Navigate to the Backend Directory
- cd server

2. Install Pipenv

If Pipenv is not installed:
- pip install pipenv

Verify installation:
- pipenv --version

3. Create Virtual Environment and Install Dependencies
pipenv install flask 
pipenv install flask-sqlalchemy 
pipenv install flask-migrate 
pipenv install flask-jwt-extended 
pipenv install flask-bcrypt 
pipenv install flask-cors 
pipenv install python-dotenv
   
4. Activate the Virtual Environment
- pipenv shell

You should see something similar to:
- (server) username@computer:~/project/server$

5. Configure Environment Variables

Create a .env file in the server directory:

SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///app.db

Example:

SECRET_KEY=my_flask_secret_key
JWT_SECRET_KEY=my_super_secure_jwt_key
DATABASE_URL=sqlite:///app.db

6. Initialize migrations:
- flask db init

Create migration:
- flask db migrate -m "Initial migration"

Apply migration:
- flask db upgrade

Run server:
- python app.py

## Frontend Setup
Install dependencies:
- npm install

Install additional packages:
- npm install axios
- npm install react-router-dom
- npm install sweetalert2

Run Application:
- npm run dev

## System Features
1. User Management
Users can register and login securely.
Fields include:
    Name
    Email
    Password
    Role
2. Program Management
Administrators can:
    Create programs
    Update program details
    Delete programs
    Assign coordinators

Program information includes:
    Title
    Description
    Venue
    Region
    Status
    Coordinator
3. Stakeholder Management
Administrators can:
    Add stakeholders
    Update stakeholder information
    Delete stakeholders

Stakeholder information includes:
    Name
    Position
    County
    Phone Number

Coordinators can view stakeholder records.

4. Attendance Management
Administrators can:
    Mark attendance
    View attendance records

Attendance includes:
    Program
    Stakeholder
    Attendance Status

Attendance status:
    Present
    Absent

Coordinators can view attendance records.

5. Report Management
Coordinators can submit reports after program activities.
Report fields include:
    Summary
    Recommendations
    Program ID

Administrators can review all submitted reports.

## Database Relationships
## One-to-Many Relationships
- User → Program

One coordinator can manage many programs.

User (1) -------- (M) Program

- Program → Report

One program can have multiple reports.

Program (1) -------- (M) Report
- Program → Attendance

One program can have multiple attendance records.

Program (1) -------- (M) Attendance
- Stakeholder → Attendance

One stakeholder can have multiple attendance records.

Stakeholder (1) -------- (M) Attendance

## Many-to-Many Relationship
- Program ↔ Stakeholder

A program can involve many stakeholders.

A stakeholder can participate in many programs.

This relationship is implemented through the Attendance table.

Program ---- Attendance ---- Stakeholder

## Author
- Denis Walubengo

- Bachelor of Business Information Technology

- Political Programs Management System

- 2026