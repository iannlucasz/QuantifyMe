const questions = [
    {
      question: "There are only _____ cookies left in the jar.",
      options: ["a little", "a few", "few", "much"],
      answer: "a few"
    },
    {
      question: "We have _____ milk. Go buy some more!",
      options: ["many", "a little", "few", "enough"],
      answer: "a little"
    },
    {
      question: "Do you have _____ sugar for my coffee?",
      options: ["any", "much", "few", "some"],
      answer: "any"
    },
    {
      question: "He didn’t study _____ to pass the test.",
      options: ["a lot of", "enough", "too", "some"],
      answer: "enough"
    },
    {
      question: "She has _____ clothes to fill two closets!",
      options: ["too", "much", "many", "a few"],
      answer: "too"
    },
    {
      question: "There isn’t _____ water in the bottle.",
      options: ["any", "many", "a few", "enough"],
      answer: "any"
    },
    {
      question: "I have _____ friends coming over later.",
      options: ["a little", "a few", "much", "many"],
      answer: "a few"
    },
    {
      question: "They didn’t have _____ chairs for everyone.",
      options: ["some", "much", "enough", "too"],
      answer: "enough"
    },
    {
      question: "We saw _____ people at the park today.",
      options: ["much", "a few", "too", "any"],
      answer: "a few"
    },
    {
      question: "There is _____ juice in the fridge.",
      options: ["a little", "many", "few", "some"],
      answer: "a little"
    }
  ];
  
  let current = 0;
  let score = 0;
  let wrongAnswers = [];
  let time = 90;
  let interval;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const timerEl = document.getElementById("timer");
  const gameEl = document.getElementById("game");
  const startScreen = document.getElementById("start-screen");
  
  function startGame() {
    startScreen.style.display = "none";
    gameEl.style.display = "block";
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => selectAnswer(option);
      optionsEl.appendChild(btn);
    });
  }
  
  function selectAnswer(option) {
    const correct = questions[current].answer;
    if (option === correct) {
      score++;
    } else {
      wrongAnswers.push({
        question: questions[current].question,
        selected: option,
        correct: correct
      });
    }
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    clearInterval(interval);
    gameEl.innerHTML = `
      <h2>🏁 Fim do jogo!</h2>
      <p class="result">Você acertou <strong>${score}</strong> de ${questions.length} perguntas.</p>
      <p class="result">Você errou <strong>${wrongAnswers.length}</strong>:</p>
      <ul class="error-list">
        ${wrongAnswers.map(e => `<li><strong>${e.question}</strong><br>Você respondeu: <em>${e.selected}</em><br>Correto: <strong>${e.correct}</strong></li>`).join("")}
      </ul>
      <button class="btn-restart" onclick="location.reload()">Jogar novamente</button>
    `;
  }
  
  function startTimer() {
    interval = setInterval(() => {
      time--;
      timerEl.textContent = `Tempo: ${time}s`;
      if (time <= 0 || current >= questions.length) {
        clearInterval(interval);
        showResult();
      }
    }, 1000);
  }
  
  