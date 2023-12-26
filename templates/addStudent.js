function validateField(fieldName, value, condition) {
    if (!condition) {
        alert(`Please enter a valid ${fieldName}`);
        return false;
    }
    return true;
}

function submitForm() {
    // Get form data using class name
    const formData = {};
    formData['fullName'] = document.getElementById('fullName').value;
    formData['rollNumber'] = document.getElementById('rollNumber').value;
    formData['email'] = document.getElementById('email').value;
    formData['gender'] = document.getElementById('gender').value;
    formData['dob'] = document.getElementById('dob').value;
    formData['city'] = document.getElementById('city').value;
    // formData['interest'] = document.getElementById('interestSelect').value;
    //formData['customInterest'] = document.getElementById('customInterest').value;
    formData['department'] = document.getElementById('department').value;
    formData['degreeTitle'] = document.getElementById('degreeTitle').value;
    formData['subject'] = document.getElementById('subject').value;
    formData['startDate'] = document.getElementById('startDate').value;
    formData['endDate'] = document.getElementById('endDate').value;
    const selectedInterest = document.getElementById('interestSelect').value;
    // If the selected value is 'other', show the custom interest input field
    if (selectedInterest === 'other') {
        formData['interest'] = document.getElementById('customInterest').value;

    } else {
        formData['interest'] = document.getElementById('interestSelect').value;
    }
    if (!validateField('Full Name', formData['fullName'], formData['fullName'])) return;
    if (!validateField('Roll Number', formData['rollNumber'], formData['rollNumber'])) return;
    if (!validateField('Email Address', formData['email'], formData['email'] && formData['email'].includes('@'))) return;
    if (!validateField('Gender', formData['gender'], formData['gender'])) return;
    if (!validateField('Date of Birth', formData['dob'], formData['dob'])) return;
    if (!validateField('City', formData['city'], formData['city'])) return;
    if (!validateField('Interest', formData['interest'], formData['interest'] && formData['interest'] !== 'interest')) return;
    if (!validateField('Department', formData['department'], formData['department'])) return;
    if (!validateField('Degree Title', formData['degreeTitle'], formData['degreeTitle'])) return;
    if (!validateField('Subject', formData['subject'], formData['subject'])) return;
    if (!validateField('Start Date', formData['startDate'], formData['startDate'])) return;
    if (!validateField('End Date', formData['endDate'], formData['endDate'])) return;
    console.log(formData)
        // Make a POST request using the Fetch API
    fetch('http://localhost:5000/api/student-interest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
}

function handleInterestChange() {

    var interestSelect = document.getElementById('interestSelect');
    var customInterestInput = document.getElementById('customInterest');

    if (interestSelect.value === 'other') {
        customInterestInput.style.display = 'inline-block';
    } else {
        customInterestInput.style.display = 'none';
    }
}

function saveStudent(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var interestSelect = document.getElementById('interestSelect');
    var customInterest = document.getElementById('customInterest').value;

    // Check if the user selected an existing interest or entered a custom one
    var selectedInterest = interestSelect.value === 'other' ? customInterest : interestSelect.value;

    // Send the data to the server using AJAX or another method
    // Here, we'll just log the data to the console for demonstration purposes
    console.log('Name:', name);
    console.log('Interest:', selectedInterest);

    // Reset the form after saving
    document.getElementById('studentForm').reset();
    // Reset the custom interest input visibility
    document.getElementById('customInterest').style.display = 'none';
}

const submitBtn = document.querySelector(".formSubmit");
submitBtn.addEventListener("click", () => {

    submitForm();
})

document.getElementById('dashboardLink').addEventListener('click', function() {
    window.location.href = './Dashboard.html';

});

document.getElementById('studentListLink').addEventListener('click', function() {
    window.location.href = './students.html';

});