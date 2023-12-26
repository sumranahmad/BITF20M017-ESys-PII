document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for navigation links
    document.getElementById('addStudentLink').addEventListener('click', function() {
        window.location.href = './addStudent.html';
    });

    document.getElementById('studentListLink').addEventListener('click', function() {
        window.location.href = './students.html';
    });

    document.querySelector(".logOut").addEventListener("click", (() => {
        window.location.href = './login.html';
    }))
});