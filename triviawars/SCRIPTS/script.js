// Define questions, score, and optionsList outside of the fetch callback
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null; // Move selectedOption outside of displayQuestion
let optionsList; // Define optionsList here
let timer; // Define timer variable
let countdownInterval; // Define countdown interval variable

// Load quiz questions from JSON file
fetch('/triviawars/quizQuestions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;

    function displayQuestion() {
      const questionText = document.getElementById('question-text');
      optionsList = document.getElementById('options-list'); // Assign optionsList here
      const message = document.getElementById('message');
      const submitButton = document.getElementById('submit-button');
      const nextButton = document.getElementById('next-button');
      const timerDisplay = document.getElementById('timer-display'); // Get the timer display element

      // Clear previous question along with the options
      questionText.textContent = '';
      optionsList.innerHTML = '';
      message.textContent = ''; // Clear any previous message
      selectedOption = null; // Reset selectedOption at the beginning of each question
      timerDisplay.textContent = '10'; // Reset timer display

      // Display current question number and question
      questionText.textContent = `Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`;

      // Display hint
      const hint = document.createElement('p');
      hint.textContent = `Hint: ${questions[currentQuestionIndex].hint}`;
      questionText.appendChild(hint);

      // Start a 10-second timer
      let timeLeft = 10;
      timerDisplay.textContent = timeLeft;
      countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          // Timer elapsed, automatically select the correct answer
          selectedOption = questions[currentQuestionIndex].correctAnswer;
          message.textContent = `Time's up! The correct answer is: ${selectedOption}`;
          // Proceed to the next question
          nextButton.click();
        }
      }, 1000); // Update every second

      // Display options as buttons
      questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.id = `option-${index}`;
        button.addEventListener('click', function () {
          // Store the selected option
          selectedOption = option;
          // Clear the timer
          clearInterval(countdownInterval);
          // Reset button colors
          const buttons = optionsList.getElementsByTagName('button');
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('correct-answer', 'incorrect-answer', 'selected-option');
          }
          // Color the selected button
          this.classList.add('selected-option');
        });
        optionsList.appendChild(button);
      });
    }

    // Add event listeners for the submit and next buttons outside of displayQuestion
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');

    submitButton.addEventListener('click', function () {
      // Check if an option was selected
      if (selectedOption) {
        // Check if the answer is correct
        const correctOption = questions[currentQuestionIndex].correctAnswer;
        const buttons = optionsList.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i].textContent === correctOption) {
            buttons[i].classList.add('correct-answer');
          } else if (buttons[i].textContent !== selectedOption) {
            buttons[i].classList.add('incorrect-answer');
          }
        }
        if (selectedOption === correctOption) {
          message.textContent = 'Correct!';
          score++;
        } else {
          message.textContent = `Wrong! The correct answer is: ${correctOption}`;
        }
        // Hide submit button and show next button
        submitButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
      } else {
        // Prompt the user to select an option before submitting
        message.textContent = 'Please select an option before submitting.';
        message.style.color = 'red'; // Optionally, change the message color to red for emphasis
      }
    });

    nextButton.addEventListener('click', function () {
      // Move to the next question or show results
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
        // Reset button colors
        const buttons = optionsList.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('correct-answer', 'incorrect-answer', 'selected-option');
        }
        // Hide submit button and show next button
        submitButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
      } else {
        // Store the user's score in localStorage
        localStorage.setItem('loggedInUserScore', score);
        // Show results
        document.getElementById('question-container').classList.add('hidden');
        document.getElementById('result-container').classList.remove('hidden');
        document.getElementById('score').textContent = score;
      }
    });

    // Add event listener for the "Start Quiz" button
    document.getElementById('start-quiz-button').addEventListener('click', function () {
      // Hide the "Start Quiz" button
      this.classList.add('hidden');
      // Show the first question
      document.getElementById('question-container').classList.remove('hidden');
      // Display the first question
      displayQuestion();
    });

    document.getElementById('restartbtn').addEventListener('click', function() {
      // Reload the page to restart the quiz
      location.reload();
    });
    document.getElementById('quitbtn').addEventListener('click', function(){
      window.location.href = 'login.html';
    });

  })
  .catch(error => console.error('Error fetching quiz questions:', error));


//registering

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('user-name').value;
  var email = document.getElementById('user-email').value;
  var userscore = 0; // Initialize score to 0 for new users
  var users = JSON.parse(localStorage.getItem('users')) || [];

  var existingUser = users.find(function(user) {
    return user.username === username;
  });

  if (existingUser) {
    document.getElementById('signupSuccess').textContent = 'Username already exists.';
  } else {
    users.push({ username: username, email: email , userscore: userscore });
    localStorage.setItem('users', JSON.stringify(users));
    redirectToLogin(); // Redirect to login page after successful registration
  }
});

// Function to redirect to the login page
function redirectToLogin() {
  window.location.href = 'login.html';
}
function redirectToHomepage(){
  window.location.href = 'index.html';
}
