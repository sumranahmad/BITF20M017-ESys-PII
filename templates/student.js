let currentStudentId;
let studentdata;
document.addEventListener('DOMContentLoaded', function() {
    // Example: Fetching and displaying student data
    fetch('http://localhost:5000/api/student-interest')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('studentTableBody');
            studentdata = data;
            data.students.forEach((student, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                  <td>${index}</td>
                  <td>${student.fullName}</td>
                  <td>${student.rollNumber}</td>
                  <td>${student.gender}</td>
                  <td>${student.dob}</td>
                  <td>${student.city}</td>
                  <td>${student.interest}</td>
                  <td>${student.department[1]}</td>
                  <td>${student.degreeTitle}</td>
                  <td>
                      <a href="#" data-action="view">View</a>
                      <a href="#" data-action="edit">Edit</a>
                      <a href="#" data-action="delete">Delete</a>
                  </td>
              `;

                // Add a click listener to the entire row
                row.addEventListener('click', function(event) {
                    // Check if the click occurred on one of the action links
                    const actionLink = event.target.closest('a[data-action]');
                    if (actionLink) {
                        event.preventDefault();
                        const action = actionLink.getAttribute('data-action');

                        // Handle the action based on the clicked link
                        switch (action) {
                            case 'view':
                                console.log(`View clicked for student with ID: ${index}`);
                                const userInfoContent = document.getElementById('userInfoContent');
                                userInfoContent.innerHTML = `
                                    <h3>User Information</h3>
                                    <p><strong>Name:</strong> ${data.students[index].fullName}</p>
                                    <p><strong>Roll Number:</strong> ${data.students[index].rollNumber}</p>
                                    <p><strong>Gender:</strong> ${data.students[index].gender}</p>
                                    <p><strong>Date of Birth:</strong> ${data.students[index].dob}</p>
                                    <p><strong>City:</strong> ${data.students[index].city}</p>
                                    <p><strong>Interest:</strong> ${data.students[index].interest}</p>
                                    <p><strong>Department:</strong> ${data.students[index].department[1]}</p>
                                    <p><strong>Degree Title:</strong> ${data.students[index].degreeTitle}</p>
                                `;
                                openModal();
                                break;
                                // Add your view logic here
                                break;
                            case 'edit':
                                console.log(`Edit clicked for student with ID: ${index}`);
                                // Add your edit logic here
                                openEditModal(index, data);
                                currentStudentId = index;
                                break;
                            case 'delete':
                                console.log(`Delete clicked for student with ID: ${index}`);
                                // Add your delete logic here
                                openDeleteModal(index)
                                currentStudentId = index;
                                break;
                            default:
                                break;
                        }
                    }
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching student data:', error));
});

function openModal() {
    const modal = document.getElementById('userInfoModal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('userInfoModal');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('userInfoModal');
    if (event.target === modal) {
        closeModal();
    }
});

function openEditModal(index, data) {
    const editModal = document.getElementById('editModal');

    // Populate the edit form with existing data
    const student = data.students[index];
    console.log(student)
    document.getElementById('editFullName').value = student.fullName;
    document.getElementById('editRollNumber').value = student.rollNumber;
    document.getElementById('editEmail').value = student.email;
    document.getElementById('editGender').value = student.gender;
    document.getElementById('editDob').value = student.dob;
    document.getElementById('editCity').value = student.city;
    document.getElementById('editInterestSelect').value = student.interest;
    document.getElementById('editCustomInterest').value = student.customInterest || ''; // Assuming customInterest is a property
    document.getElementById('editDepartment').value = student.department;
    document.getElementById('editDegreeTitle').value = student.degreeTitle;
    document.getElementById('editSubject').value = student.subject;
    document.getElementById('editStartDate').value = student.startDate;
    document.getElementById('editEndDate').value = student.endDate;

    // Show or hide the custom interest field based on the selected interest
    handleEditInterestChange();

    // Show the edit modal
    editModal.style.display = 'block';
}
// Function to close the edit modal
function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}

function updateStudent() {
    // Get updated values from the edit form
    const updatedFullName = document.getElementById('editFullName').value;
    const updatedRollNumber = document.getElementById('editRollNumber').value;
    const updatedEmail = document.getElementById('editEmail').value;
    const updatedGender = document.getElementById('editGender').value;
    const updatedDob = document.getElementById('editDob').value;
    const updatedCity = document.getElementById('editCity').value;
    const updatedInterest = document.getElementById('editInterestSelect').value;
    const updatedCustomInterest = document.getElementById('editCustomInterest').value;
    const updatedDepartment = document.getElementById('editDepartment').value;
    const updatedDegreeTitle = document.getElementById('editDegreeTitle').value;
    const updatedSubject = document.getElementById('editSubject').value;
    const updatedStartDate = document.getElementById('editStartDate').value;
    const updatedEndDate = document.getElementById('editEndDate').value;

    // Use these values to make an update request
    // You can use fetch or another method to send the update request
    // Example:
    // const index = GetId(); // Assuming you have an id property
    console.log(studentdata)
    const id = studentdata.students[currentStudentId].id;
    console.log(id)
    fetch(`http://localhost:5000/api/student-interest/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: updatedFullName,
                rollNumber: updatedRollNumber,
                email: updatedEmail,
                gender: updatedGender,
                dob: updatedDob,
                city: updatedCity,
                interest: updatedInterest,
                customInterest: updatedCustomInterest,
                department: updatedDepartment,
                degreeTitle: updatedDegreeTitle,
                subject: updatedSubject,
                startDate: updatedStartDate,
                endDate: updatedEndDate,
                // Add other properties here
            }),
        })
        .then(response => response.json())
        .then(updatedData => {
            // Handle the updated data
            console.log('Student updated:', updatedData);

            // Close the edit modal
            closeEditModal();
            window.location.href = './students.html';
        })
        .catch(error => console.error('Error updating student:', error));
}

function handleEditInterestChange() {
    const editInterestSelect = document.getElementById('editInterestSelect');
    const editCustomInterest = document.getElementById('editCustomInterest');

    if (editInterestSelect.value === 'other') {
        // If "other" is selected, show the custom interest field
        editCustomInterest.style.display = 'block';
    } else {
        // Otherwise, hide the custom interest field
        editCustomInterest.style.display = 'none';
    }
}
document.querySelector(".update_btn").addEventListener("click", () => {
    updateStudent();
})

function openDeleteModal(index) {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'block';
}

// Function to close the delete modal
function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'none';
}

// Function to confirm the delete action
function confirmDelete() {
    // Implement your delete logic here
    // You can send a DELETE request to your server API
    // Example:
    //  * Get the index of the student you're deleting */ 
    console.log("conform button ")
    const studentId = studentdata.students[currentStudentId].id; // Assuming you have an id property
    console.log(studentId)
    fetch(`http://localhost:5000/api/student-interest/${studentId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(deletedData => {
            // Handle the deleted data
            console.log('Student deleted:', deletedData);

            // Close the delete modal
            closeDeleteModal();
            window.location.href = './students.html';
        })
        .catch(error => console.error('Error deleting student:', error));
}

document.querySelector(".ConformBtn").addEventListener("click", () => {
    confirmDelete()

})
document.querySelector(".closeBtn").addEventListener("click", () => {
    closeDeleteModal()
})

document.querySelector(".logOut").addEventListener("click", (() => {
    window.location.href = './login.html';
}))

document.querySelector("#dashboardLink").addEventListener("click", () => {
    window.location.href = './Dashboard.html';
})