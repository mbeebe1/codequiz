var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within_______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store _______.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is",
    choices: ["Javascript", "terminal/bash", "for loops", "console log"],
    answer: "console log",
  },
];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#Start");
var questions = document.querySelector("#questions");
var content = document.querySelector("#content");
var secondsLeft = 75;
var holdInterval = 0;
var penaltyTime = 10;
var createUl = document.createElement("ul");
var Highscores = document.querySelector("#Highscores");

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Timer:   " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        finished();
        currentTime.textContent = "Time is finished!";
      }
    }, 1000);
  }
  begin(questionIndex);
});

function begin(questionIndex) {
  questions.innerHTML = "";
  createUl.innerHTML = "";

  for (var i = 0; i < quizQuestions.length; i++) {
    var userQuestion = quizQuestions[questionIndex].question;
    var userChoices = quizQuestions[questionIndex].choices;
    questions.textContent = userQuestion;
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questions.appendChild(createUl);
    createUl.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    if (element.textContent == quizQuestions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Correct!";
    } else {
      secondsLeft = secondsLeft - penaltyTime;
      createDiv.textContent = "Wrong!";
    }
  }

  questionIndex++;

  if (questionIndex >= quizQuestions.length) {
    finished();
    createDiv.textContent =
      "Quiz Over!" +
      "" +
      "You got " +
      score +
      "/" +
      quizQuestions.length +
      " Correct!";
  } else {
    begin(questionIndex);
  }
  questions.appendChild(createDiv);
}
function finished() {
  questions.innerHTML = "";
  currentTime.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "Finished!";
  questions.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");
  questions.appendChild(createP);

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questions.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questions.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questions.appendChild(createInput);

  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questions.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
    }
    var highScore = document.querySelector(".Highscores");
    var clear = document.querySelector("#clear");
    var Return = document.querySelector("#Return");

    clear.addEventListener("click", function () {
      localStorage.clear();
      location.reload();
    });

    var allScores = localStorage.getItem("allScores");
    allScores = JSON.parse(allScores);

    if (allScores !== null) {
      for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
      }
    }

    Return.addEventListener("click", function () {
      location.reload();
    });
  });
}
