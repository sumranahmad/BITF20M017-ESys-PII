document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Make an AJAX request to the Flask endpoint for login using the fetch method
        fetch('http://localhost:5000/api/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (data.success) {
                    window.location.href = './Dashboard.html'
                        // You can redirect or perform other actions upon successful login
                } else {
                    alert('Invalid username or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Error during login. Please try again later.');
            });
    });
})