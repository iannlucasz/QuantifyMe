// script.js

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const scoreDisplay = document.getElementById("score");
const progress = document.getElementById("current");
const timeDisplay = document.getElementById("time");
const mistakesDisplay = document.getElementById("mistakes");

let currentQuestion = 0;
let score = 0;
let mistakes = [];
let timer;
let timeLeft = 90;

const questions = [
  {
    question: "How ____ money do you have?",
    options: ["many", "much", "some"],
    answer: "much",
  },
  {
    question: "There are ____ students in the class.",
    options: ["much", "a few", "little"],
    answer: "a few",
  },
  {
    question: "I don’t have ____ friends here.",
    options: ["many", "much", "any"],
    answer: "many",
  },
  {
    question: "We need ____ sugar for the cake.",
    options: ["a little", "few", "many"],
    answer: "a little",
  },
  {
    question: "She didn’t eat ____ of the food.",
    options: ["some", "much", "many"],
    answer: "much",
  },
  {
    question: "There aren’t ____ apples left.",
    options: ["any", "some", "a little"],
    answer: "any",
  },
  {
    question: "He has ____ work to do.",
    options: ["too much", "too many", "some"],
    answer: "too much",
  },
  {
    question: "Do you have ____ questions?",
    options: ["some", "any", "too"],
    answer: "any",
  },
  {
    question: "We don’t have ____ chairs.",
    options: ["a few", "many", "too much"],
    answer: "many",
  },
  {
    question: "She drank ____ water after the run.",
    options: ["a few", "too much", "many"],
    answer: "too much",
  },
];

function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  startTimer();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  progress.textContent = currentQuestion + 1;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsContainer.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
  } else {
    mistakes.push({
      question: questions[currentQuestion].question,
      correct,
      selected,
    });
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  game.classList.add("hidden");
  result.classList.remove("hidden");
  scoreDisplay.textContent = score;

  if (mistakes.length > 0) {
    mistakesDisplay.innerHTML = "<h3>Erros:</h3><ul>" +
      mistakes.map(m => `<li>${m.question}<br><strong>Correta:</strong> ${m.correct} | <strong>Sua resposta:</strong> ${m.selected}</li>`).join("") +
      "</ul>";
  } else {
    mistakesDisplay.innerHTML = "<p>🎉 Parabéns! Você acertou tudo!</p>";
  }
}
