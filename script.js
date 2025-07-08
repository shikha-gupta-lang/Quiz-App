const questions = [
  {
    question: "What is the full form of CSS?",
    options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Inside which tag do we put the JavaScript?",
    options: ["<js>", "<script>", "<scripting>", "<javascript>"],
    answer: "<script>"
  },
  {
    question: "Which HTML tag is used for largest heading?",
    options: ["<h6>", "<head>", "<h1>", "<heading>"],
    answer: "<h1>"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "**"],
    answer: "//"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const timerFill = document.getElementById("timer-fill");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  quizBox.classList.remove("hide");
  resultBox.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  startTimerBar();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(li, option);
    optionsEl.appendChild(li);
  });

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    updateTimerBar();

    if (timeLeft <= 0) {
      clearInterval(timer);
      goToNext();
    }
  }, 1000);
}

function updateTimer() {
  timerEl.textContent = `Time: ${timeLeft}s`;
}

function updateTimerBar() {
  timerFill.style.width = `${(timeLeft / 15) * 100}%`;
}

function startTimerBar() {
  timerFill.style.transition = "none";
  timerFill.style.width = "100%";
  setTimeout(() => {
    timerFill.style.transition = "width 1s linear";
  }, 50);
}

function checkAnswer(element, selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    element.style.backgroundColor = "green";
    score++;
  } else {
    element.style.backgroundColor = "red";
  }

  Array.from(optionsEl.children).forEach(li => {
    li.onclick = null;
    if (li.textContent === correct) {
      li.style.backgroundColor = "green";
    }
  });
}

function goToNext() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  scoreEl.textContent = `Your Score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", goToNext);

startQuiz();
