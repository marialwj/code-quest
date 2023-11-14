// Get references to the sections
var quizIntro = document.querySelector('.quiz-intro');
var startQuizButton = document.getElementById('start-quiz-btn');
var questionsSection = document.querySelector('.questions');
var endScreen = document.querySelector('.end-screen');
var scoresScreen = document.querySelector('.scores-screen');

var timeleft = 100;
var currentQuestionIndex = 0; // Keep track of the current question index
var timerInterval; // Variable to store the timer interval
var isPaused = false; // Variable to track whether the timer is paused

var questions = [
    {
        question: "Commonly used data types DO NOT include",
        answer: [
            { text: "Strings", isCorrect: false },
            { text: "Booleans", isCorrect: false },
            { text: "Alerts", isCorrect: true },
            { text: "Numbers", isCorrect: false }
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within",
        answer: [
            { text: "Quotes", isCorrect: false },
            { text: "Curly brackets", isCorrect: false },
            { text: "Parenthesis", isCorrect: true },
            { text: "Square brackets", isCorrect: false }
        ]
    },
{
    question: "Where is the Correct Place to Insert a JavaScript?",
    answer: [
        {text: "head", isCorrect: false},
        {text: "body", isCorrect: true},
        {text: "footer", isCorrect: false},
        {text: "title", isCorrect: false},
    ]
},
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: [
            { text: "script", isCorrect: true },
            { text: "js", isCorrect: false },
            { text: "scripting", isCorrect: false },
            { text: "javascript", isCorrect: false },
        ]
    },
    {
        question: "Which Of These is Not A Operator",
        answer: [
            {text: "&", isCorrect: true},
            {text: "*", isCorrect: false},
            {text: "+", isCorrect: false},
            {text: "-", isCorrect: false},
        ]
    },
    {
        question: "Who Created JavaScript?",
        answer: [
            { text: "Paul Mescal", isCorrect: false },
            { text: "Bill Gates", isCorrect: false },
            { text: "Brendan Eich", isCorrect: true },
            { text: "Harry Styles", isCorrect: false },
        ]
    }
];

// Event listener for the "Start Quiz!" button
startQuizButton.addEventListener("click", function () {
    // Hide the quiz intro section
    quizIntro.style.display = "none";

    // Show the questions section (assuming you want to show questions next)
    questionsSection.style.display = "block";

    // Display the first question
    displayQuestion(0);

    // Start the timer
    timerInterval = setInterval(function () {
        if (!isPaused) {
            timeleft--;
            document.querySelector('#timer').textContent = timeleft;

            // Check if the timer reaches 0
            if (timeleft <= 0 || currentQuestionIndex >= questions.length) {
                clearInterval(timerInterval);
                quizEnd();
            }
        }
    }, 1000);
});

function displayQuestion(index) {
    var currentQuestion = questions[index];

    // Create question element
    var questionElement = document.createElement('h3');
    questionElement.textContent = currentQuestion.question;

    // Create ul element for answer options
    var ulElement = document.createElement('ul');

    // Create li elements with buttons for each answer option
    currentQuestion.answer.forEach(function (answerOption, optionIndex) {
        var liElement = document.createElement('li');
        var buttonElement = document.createElement('button');
        buttonElement.textContent = answerOption.text;
        buttonElement.addEventListener('click', function () {
            handleAnswer(optionIndex, currentQuestion);
        });
        liElement.appendChild(buttonElement);
        ulElement.appendChild(liElement);
    });

    // Clear existing content in questionsSection
    questionsSection.innerHTML = '';

    // Append the question and answer options to the questionsSection
    questionsSection.appendChild(questionElement);
    questionsSection.appendChild(ulElement);

    // Add a click event listener to pause the timer when an answer is clicked
    document.querySelectorAll('.questions li button').forEach(function (button) {
        button.addEventListener('click', function () {
            pauseTimer();
        });
    });
}

function handleAnswer(selectedIndex, currentQuestion) {
    var isCorrect = currentQuestion.answer[selectedIndex].isCorrect;

    if (!isCorrect) {
        timeleft = Math.max(0, timeleft - 10);
        document.querySelector('#response').textContent = "Incorrect!";
    } else {
        document.querySelector('#response').textContent = "Correct!";
    }

    // Display the correctness response for a short duration
    setTimeout(function () {
        document.querySelector('#response').textContent = "";

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
            resumeTimer(); // Resume the timer after displaying the next question
        } else {
            // If there are no more questions, end the quiz
            quizEnd();
        }
    }, 1000);
}

function quizEnd() {
    // Show the end screen
    endScreen.style.display = "block";
    questionsSection.style.display = "none";

    // Display the final score
    document.querySelector("#finalscore").textContent = timeleft;
}

function pauseTimer() {
    isPaused = true;
}

function resumeTimer() {
    isPaused = false;
}

// Console Logs

function viewHighscores() {
    document.querySelector(".scores-screen").style.display = "block";
    var scores = JSON.parse(localStorage.getItem("HighScores"));
    var sortedscores = scores.sort(function(a,b){
        return b.score-a.score
    })
for (var i=0; i<sortedscores.length;i++){
    var row = `
    <tr>
    <td>${i+1}</td> 
    <td>${sortedscores[i].initial}</td>
</tr>  
    `
document.querySelector("#RankList").appendChild(row)
}
    console.log('View Highscores clicked');
}

function startQuiz() {
    // Add the logic for starting the quiz
    console.log('Start Quiz clicked');
}

function answerQuestion() {
    // Add the logic for answering a question
    console.log('Answer Question clicked');
}

function submitScore() {
    // Add the logic for submitting a score
    console.log('Submit Score clicked');
    document.querySelector(".scores-screen").style.display = "block"
    var scores = JSON.parse(localStorage.getItem("HighScores")) || [];
    var newscore = {
        score:timeleft,
        initial:document.querySelector("#initialsinput").value
    }
    scores.push(newscore)
    var sortedscores = scores.sort(function(a,b){
        return b.score-a.score
    })
for (var i=0; i<sortedscores.length;i++){
var row = document.createElement("tr")
var cell1 = document.createElement("td")
var cell2 = document.createElement("td")
cell1.textContent=i+1
cell2.textContent=sortedscores[i].initial
row.appendChild(cell1)
row.appendChild(cell2)

    document.querySelector("#RankList").appendChild(row)
    }
}

function clearHighscores() {
    localStorage.removeItem('HighScores');
    document.querySelector("#RankList").innerHTML = ''
    console.log('Clear Highscores clicked');
}

function goBack() {
    console.log('Go Back button clicked');
    window.location.href = "file:///Users/mariageorgy/bootcamp/code-quest/index.html";
}
