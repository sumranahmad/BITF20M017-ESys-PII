from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from urllib.parse import quote_plus

app = Flask(__name__)
CORS(app)

# Your original password
password = 'Sumran@10'

# Encode the password
encoded_password = quote_plus(password)

# Use the encoded password in the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://root:{encoded_password}@localhost:3306/student_data'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    rollNumber = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    Interest = db.Column(db.String(50))
    department = db.Column(db.String(50), nullable=False)
    degreeTitle = db.Column(db.String(50), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    startDate = db.Column(db.Date, nullable=False)
    endDate = db.Column(db.Date, nullable=False)
    # Define the Admin model
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Dummy Admin credentials for demonstration purposes
admin_username = 'admin'
admin_password = 'password'

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    data = request.get_json()

    entered_username = data.get('username')
    entered_password = data.get('password')

    # Query the database for the entered username
    admin = Admin.query.filter_by(username=entered_username).first()

    if admin and admin.password == entered_password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401


@app.route('/api/student-interest', methods=['POST'])
def submit_interest():
    data = request.json
    
    # Ensure that the 'fullName' field is provided
    if 'fullName' not in data:
        return jsonify({'error': 'fullName field is required'}), 400

    student = Student(
        fullName=data.get('fullName'),
        rollNumber=data.get('rollNumber'),
        email=data.get('email'),
        gender=data.get('gender'),
        dob=data.get('dob'),
        city=data.get('city'),
        Interest=data.get('interest'),
        department=data.get('department'),
        degreeTitle=data.get('degreeTitle'),
        subject=data.get('subject'),
        startDate=data.get('startDate'),
        endDate=data.get('endDate')
    )

    db.session.add(student)
    db.session.commit()

    return jsonify({'message': 'Form submitted successfully', 'interest': data.get("interest")})

@app.route('/api/student-interest', methods=['GET'])
def get_students():
    students = Student.query.all()

    # Convert the list of student objects to a list of dictionaries
    students_list = [{
        'id': student.id,
        'fullName': student.fullName,
        'rollNumber': student.rollNumber,
        'email': student.email,
        'gender': student.gender,
        'dob': str(student.dob),
        'city': student.city,
        'interest': student.Interest,
        'department': student.department,
        'degreeTitle': student.degreeTitle,
        'subject': student.subject,
        'startDate': str(student.startDate),
        'endDate': str(student.endDate)
    } for student in students]

    return jsonify({'students': students_list})

@app.route('/api/student-interest/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get(student_id)

    if student:
        student_data = {
            'id': student.id,
            'fullName': student.fullName,
            'rollNumber': student.rollNumber,
            'email': student.email,
            'gender': student.gender,
            'dob': str(student.dob),
            'city': student.city,
            'interest': student.Interest,
            'department': student.department,
            'degreeTitle': student.degreeTitle,
            'subject': student.subject,
            'startDate': str(student.startDate),
            'endDate': str(student.endDate)
        }
        return jsonify({'student': student_data})
    else:
        return jsonify({'error': 'Student not found'}), 404

@app.route('/api/student-interest/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = Student.query.get(student_id)

    if student:
        data = request.json

        student.fullName = data.get('fullName', student.fullName)
        student.rollNumber = data.get('rollNumber', student.rollNumber)
        student.email = data.get('email', student.email)
        student.gender = data.get('gender', student.gender)
        student.dob = data.get('dob', student.dob)
        student.city = data.get('city', student.city)
        student.Interest = data.get('interest', student.Interest)
        student.department = data.get('department', student.department)
        student.degreeTitle = data.get('degreeTitle', student.degreeTitle)
        student.subject = data.get('subject', student.subject)
        student.startDate = data.get('startDate', student.startDate)
        student.endDate = data.get('endDate', student.endDate)

        db.session.commit()

        return jsonify({'message': 'Student updated successfully'})
    else:
        return jsonify({'error': 'Student not found'}), 404

@app.route('/api/student-interest/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get(student_id)

    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully'})
    else:
        return jsonify({'error': 'Student not found'}), 404

if __name__ == '__main__':
    # Create database tables
    with app.app_context():
        db.create_all()

    # Run the Flask app
    app.run(debug=True)
