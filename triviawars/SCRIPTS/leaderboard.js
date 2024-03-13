document.addEventListener('DOMContentLoaded', function () {
    var leaderboardList = document.getElementById('leaderboard-list');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var loggedInUser = localStorage.getItem('loggedInUser'); // Get the username of the logged-in user
    var loggedInUserScore = parseInt(localStorage.getItem('loggedInUserScore')) || 0; // Get the score of the logged-in user

    // Check if the user has completed the quiz and obtained a final score
    if (loggedInUserScore > 0) {
        // Update the score of the previous user in the users array
        var previousUserIndex = users.findIndex(function (user) {
            return user.username === loggedInUser;
        });

        if (previousUserIndex !== -1) {
            users[previousUserIndex].userscore = loggedInUserScore;
            localStorage.setItem('users', JSON.stringify(users)); // Update the users data in local storage
        }
    }

    // Sort users by score in descending order
    users.sort((a, b) => b.userscore - a.userscore);

    // Display users and their scores on the leaderboard
    users.forEach(function (user, index) {
        var listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${user.username}: ${user.userscore}`;
        leaderboardList.appendChild(listItem);
    });
});
