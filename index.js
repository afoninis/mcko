const data = [
  { question: "id(a)", rightAnswer: "Логическая тождественность (равенство)" },
  { question: "¬", rightAnswer: "НЕ, NOT, логическая инверсия" },
  { question: "∧", rightAnswer: "И, AND, & логическое умножение" },
  { question: "∨", rightAnswer: "ИЛИ, OR, логическое сложение" },
];

const playerResults = { rightAnswers: 0, wrongAnswers: 0, allAnswers: [] };

let score = 0;
let streak = 0;
let currentQuestion = { question: "", answers: [], rightAnswer: "" };

const elMainMenu = document.querySelector(".main-menu");
const elHints = document.querySelector(".hints");
const elPlayScene = document.querySelector(".play-scene");
const elNotification = document.querySelector(".notification");

const elPlayWindowQuestion = document.querySelector(".play-window__title");
const elPlaySceneStreak = document.querySelector(".play-scene__streak");
const elPlaySceneScore = document.querySelector(".play-scene__score");

const elsPlayWindowAnswers = document.querySelectorAll(".play-window__text");

const musicPlayer = document.querySelector("#music-player");

function showMenu() {
  elMainMenu.style.display = "block";
}
function hideMenu() {
  elMainMenu.style.display = "none";
}

function showHints() {
  elHints.style.display = "block";
}
function hideHints() {
  elHints.style.display = "none";
}

function showPlayScene() {
  elPlayScene.style.display = "block";
}
function hidePlayScene() {
  elPlayScene.style.display = "none";
}

function updateStreak() {
  elPlaySceneStreak.innerHTML = `x${streak}`;
}
function updateScore() {
  elPlaySceneScore.innerHTML = `${score}`;
}

function showNotification(text) {
  elNotification.style.display = "grid";
  setTimeout(function () {
    elNotification.classList.add("show");
  }, 100);
  setTimeout(function () {
    elNotification.classList.remove("show");
    elNotification.classList.add("hide");
  }, 2000);
  setTimeout(function () {
    elNotification.style.display = "none";
    elNotification.classList.remove("hide");
  }, 3500);

  elNotification.children[0].innerHTML = text;
  if (text == "right") {
    elNotification.style.backgroundColor = "rgb(133, 238, 107)";
  } else if (text == "wrong") {
    elNotification.style.backgroundColor = "rgb(238, 122, 107)";
  }
}

function playMusic() {
  musicPlayer.volume = 0.2;
  musicPlayer.play();
}

function onPlayPress() {
  hideMenu();
  hideHints();
  showPlayScene();
  resetAll();
  makeQuestion();
  displayQuestion();
}
function onBackPress() {
  showMenu();
  hideHints();
  hidePlayScene();
}

function resetAll() {
  streak = 0;
  score = 0;
  updateStreak();
  updateScore();
  currentQuestion = currentQuestion = {
    question: "",
    answers: [],
    rightAnswer: "",
  };
  elPlaySceneStreak.innerHTML = "x0";
}

function makeQuestion() {
  let randValue = Math.floor(Math.random() * data.length);
  let randQuestion = data[randValue].question;
  let randRightAnswer = data[randValue].rightAnswer;
  currentQuestion["question"] = randQuestion;
  currentQuestion["rightAnswer"] = randRightAnswer;
  let randAnswers = data.map((el) => el.rightAnswer);
  for (let i = data.length - 1; i > 0; i--) {
    let randPos = Math.floor(Math.random() * (i + 1));
    [randAnswers[i], randAnswers[randPos]] = [
      randAnswers[randPos],
      randAnswers[i],
    ];
  }
  currentQuestion["answers"] = randAnswers;
}
function displayQuestion() {
  elPlayWindowQuestion.innerHTML = currentQuestion["question"];
  currentQuestion["answers"].map((el, i) => {
    elsPlayWindowAnswers[i].innerHTML = el;
  });
}

function startGame() {
  resetAll();
}

function isAnswerCorrect(clickedEl) {
  //   if (currentQuestion["rightAnswer"] == clickedEl.children[0].textContent) {

  //   }
  return currentQuestion["rightAnswer"] == clickedEl.children[0].textContent
    ? true
    : false;
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".menu__item.play")) {
    onPlayPress();
  } else if (e.target.closest(".play-scene__back-btn")) {
    onBackPress();
  } else if (e.target.closest(".play-window__answer")) {
    // if (isAnswerCorrect(e.target.closest(".play-window__answer")))
    //     playerResults["rightAnswers"] += 1
    // isAnswerCorrect(e.target.closest(".play-window__answer"))
    //   ? (playerResults["rightAnswers"] += 1)
    //   : (playerResults["wrongAnswers"] += 1);

    if (isAnswerCorrect(e.target.closest(".play-window__answer"))) {
      playerResults["rightAnswers"] += 1;
      streak += 1;
      score += streak;
      showNotification("right");
    } else {
      playerResults["wrongAnswers"] += 1;
      streak = 0;
      showNotification("wrong");
    }
    updateStreak();
    updateScore();

    setTimeout(function () {
      makeQuestion();
      displayQuestion();
    }, 2000);

    // доделать логи всех ответов
  }
});

document.addEventListener("onload", function () {
  elPlaySceneStreak.innerHTML = `x${streak}`;
});

hideMenu();
makeQuestion();
displayQuestion();
