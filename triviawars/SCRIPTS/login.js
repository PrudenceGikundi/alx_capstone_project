document.getElementById('loginform').addEventListener('submit', function (event) {
  event.preventDefault();
  let username = document.getElementById('username_identifier').value;
  let Email = document.getElementById('useremail_identifier').value
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find(function (user) {
    return (user.username === username || user.email === Email);
  });

  if (user) {
    localStorage.setItem('loggedInUser', user.username);
    score = user.userscore; // Update the score variable with user's score
    redirectToHomepage(); // Redirect to homepage after successful login
  } else {
    document.getElementById('loginError').textContent = 'Invalid username or email. Please try again or sign up.';
  }
});

// Function to redirect to the homepage
function redirectToHomepage() {
  window.location.href = 'index.html';
}
