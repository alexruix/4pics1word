const keyboard = document.getElementById("keyboard");
const grid = document.getElementById("grid");
const section = document.getElementById("section");
const popupId = document.getElementById("popup");
const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
let myAnswer = [];
let level = 1;
let lives = ["1", "2", "3", "4"];

const onlyLevel = data.map((item) => item.word);
const onlyImage = data.map((item) => item.image);

let currentLevel = onlyLevel[level - 1];
let currentImage = onlyImage[level - 1];
let secretWord = [...currentLevel];

let position = [];
let row = [];

let secondsValue = 0;
let minutesValue = 0;
let currentInterval;

const pressLetter = () => {
  const btn = event.target; //Selecciona el elemento que hacemos click y devuelve todos sus parametros
  const enterBtn = document.getElementById("enter");
  if (myAnswer.length < secretWord.length) {
    myAnswer.push(btn.id);
    const currentItem = document.getElementById(`tile-${myAnswer.length}`);
    currentItem.textContent = btn.textContent;
    enterBtn.disabled = true;
    if (myAnswer.length === secretWord.length) {
      enterBtn.disabled = false;
    }
  } else {
    console.log(`word complete`);
  }
};

const img = () => {
  //Delete img
  // const section = document.createElement("section");
  // section.className = "container";
  // section.setAttribute("id", "section");
  const container = document.createElement("div");
  container.className = "section";
  container.setAttribute("id", "game");
  const img = document.createElement("img");
  img.classList.add("img");
  img.setAttribute("src", currentImage);
  img.setAttribute("alt", "4Pics 1word");

  container.appendChild(img);
  section.appendChild(container);
  // main.append(section);
};

const wordTiles = () => {
  row = [];

  const game = document.getElementById("game");
  const list = document.createElement("ul");
  list.classList.add("grid-row");
  secretWord.forEach(function (elemento, indice) {
    const listItem = document.createElement("li");
    listItem.classList.add("grid-tiles");
    listItem.id = `tile-${indice + 1}`;

    list.appendChild(listItem);
    row.push(list);
  });
  game.append(...row);
};
const changeLevel = () => {
  currentLevel = onlyLevel[level - 1];
  currentImage = onlyImage[level - 1];
  secretWord = [...currentLevel];

  myAnswer = [];
  position = [];
};

const checkWord = () => {
  if (myAnswer.length === secretWord.length) {
    for (let i = 0; i < secretWord.length; i++) {
      switch (true) {
        case myAnswer[i] === secretWord[i]:
          position.push("correct");
          break;
        default:
          position.push("incorrect");
          break;
      }
    }
    position.map((color, id) => {
      const item = document.getElementById(`tile-${id + 1}`);
      item.classList.add(color);
    });

    if (position.every((positions) => positions === "correct")) {
      //Para saber si todos cumplen la condicion
      if (level === onlyLevel.length) {
        //Complete game

        setTimeout(() => {
          //Winner popup
          popup("Congrats!");
          // lives = ["1", "2", "3"];
          // resetAll();
        }, 600);
      } else {
        //you win
        setTimeout(() => {
          //Winner popup
          popup("Excellent!");
          lives = ["1", "2", "3", "4"];
        }, 600);
      }
    } else {
      //you lost
      setTimeout(() => {
        deleteLives();
        changeLevel();
        resetAll();
      }, 900);
    }
  }
};

const deleteLetter = () => {
  if (myAnswer.length > 0) {
    myAnswer.pop();
    position.pop();
    const item = document.getElementById(`tile-${myAnswer.length + 1}`);
    item.textContent = [];
    item.classList.remove("incorrect");
    item.classList.remove("noexist");
    item.classList.remove("correct");
  } else {
    console.log(`Deleting..`, myAnswer);
  }

  // myAnswer.length > 0 ? myAnswer.pop() :
};

keyboardLetters.map((letters) => {
  const list = document.createElement("div");
  list.classList.add("keyboard-container");
  letters.map((letter) => {
    const btnLetter = document.createElement("button");
    btnLetter.classList.add("keyboard-letter");
    btnLetter.setAttribute("id", `${letter}`);
    btnLetter.textContent = letter;
    //Delete icon
    const deleteL = document.createElement("i");
    deleteL.classList.add("fa-solid", "fa-delete-left");

    switch (letter) {
      case "enter":
        btnLetter.disabled = true;
        btnLetter.addEventListener("click", checkWord);
        break;
      case "delete":
        btnLetter.textContent = " ";
        btnLetter.appendChild(deleteL);
        btnLetter.addEventListener("click", deleteLetter);
        break;
      default:
        btnLetter.addEventListener("click", pressLetter);
    }

    // listItem.appendChild(btnLetter);
    list.appendChild(btnLetter);
  });
  listElements.push(list);
});
keyboard.append(...listElements);

const resetAll = () => {
  const enterBtn = document.getElementById("enter");
  myAnswer = [];
  position = [];
  position.map((color, id) => {
    const item = document.getElementById(`tile-${id + 1}`);
    item.textContent = "";
    console.log(`color`, item);
  });
  section.innerHTML = "";

  createHud();
  img();
  wordTiles();
  clearInterval(currentInterval);
  timer();

  enterBtn.disabled = true;
};

const popup = (text) => {
  clearInterval(currentInterval);

  const container = document.getElementById("popup");
  container.className = "popup-container";
  const popup = document.createElement("div");
  popup.className = "popup";
  const popupTitle = document.createElement("div");
  popupTitle.className = "popup-title";
  const title = document.createElement("h2");
  title.textContent = text;
  title.className = "title";
  const subtitle = document.createElement("span");
  subtitle.textContent = `Level ${level} complete`;
  subtitle.className = "subtitle";
  const starContainer = document.createElement("div");
  starContainer.className = "star-container";
  const starSpan = document.createElement("span");
  starSpan.className = "star";
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("keyboard-letter", "keyboard-letter--next");
  nextBtn.addEventListener("click", nextLevel);
  nextBtn.textContent = "Next Level";

  let winner = ["one", "two", "three"];
  const winnerEach = (winner) => {
    winner.forEach(function () {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");

      starSpan.appendChild(star);
      starContainer.appendChild(starSpan);
    });
  };

  if (minutesValue <= 0 && secondsValue < 59) {
    winnerEach(winner);
  } else if (minutesValue <= 0 && secondsValue > 59) {
    winner = ["one", "two"];
    winnerEach(winner);
    console.log(`Second`, winner);
  } else {
    winner = ["one"];
    winnerEach(winner);
  }

  const hudContainer = document.createElement("div");
  hudContainer.classList.add("hud-container", "popup-timer");
  const timer = document.createElement("p");
  const timerIcon = document.createElement("i");
  timerIcon.classList.add("fa-solid", "fa-clock");
  timer.textContent = `${formatTime(minutesValue)}:${formatTime(secondsValue)}`;

  if (lives.length === 1) {
    subtitle.textContent = "";
    starSpan.classList.add("lost");
    nextBtn.textContent = "Restart game";
    timerIcon.className = "";
    timerIcon.classList.add("fa-solid", "fa-award");
    timer.textContent = `Level: ${level}`;
    level = 0;
    lives = [1, 2, 3, 4, 5];
    nextBtn.addEventListener("click", nextLevel);
  }

  if (level === data.length) {
    subtitle.textContent = "Game complete";
    nextBtn.textContent = "Restart game";
    timer.textContent = `You complete ${level} levels`;
    level = 0;
    lives = [1, 2, 3, 4];
    timerIcon.classList.add("fa-solid", "fa-trophy");
    nextBtn.addEventListener("click", nextLevel);
  }

  //Create popup
  popupTitle.appendChild(title);
  popupTitle.appendChild(subtitle);
  popup.appendChild(popupTitle);

  popup.appendChild(starContainer);

  hudContainer.appendChild(timerIcon);
  hudContainer.appendChild(timer);
  popup.appendChild(hudContainer);

  popup.appendChild(nextBtn);
  container.appendChild(popup);
};

const nextLevel = () => {
  popupId.classList.add("popup-scale");
  clearInterval(currentInterval);
  secondsValue = 00;
  minutesValue = 00;
  timer();
  level++;
  changeLevel();
  resetAll();
  setTimeout(() => {
    popupId.innerHTML = "";
    popupId.className = "";
  }, 1000);
  // popup();
};

//Se puede hacer en el else de checkWord
const deleteLives = () => {
  if (lives.length > 1) {
    lives.pop();
  } else {
    popup("You lost!");
    lives.pop();
  }
};

const createHud = () => {
  const section = document.getElementById(`section`);
  const container = document.createElement("div");
  container.className = "hud-container";

  //Level Display
  const levelContainer = document.createElement("div");
  levelContainer.className = "level-container";
  const levelDisplay = document.createElement("span");
  levelDisplay.textContent = level;

  //TimeDisplay
  const timeContainer = document.createElement("div");
  timeContainer.className = "time-container";
  const timeIcon = document.createElement("i");
  timeIcon.classList.add("fa-solid", "fa-clock");
  const timeDisplay = document.createElement("div");
  const timeDivider = document.createElement("span");
  timeDivider.textContent = " : ";

  const timeMinutesDisplay = document.createElement("span");
  timeMinutesDisplay.textContent = formatTime(minutesValue);
  timeMinutesDisplay.setAttribute("id", "minutesSpan");
  const timeSecondsDisplay = document.createElement("span");
  timeSecondsDisplay.setAttribute("id", "secondsSpan");
  timeSecondsDisplay.textContent = formatTime(secondsValue);

  //Hearts
  const heartContainer = document.createElement("div");
  heartContainer.className = "heart-container";

  //Create hearts
  lives.map((life) => {
    const heartSpan = document.createElement("span");
    heartSpan.className = "heart";
    heartSpan.setAttribute("id", `heart-${life}`);
    const heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart");

    //Create hearts
    heartSpan.appendChild(heart);
    heartContainer.appendChild(heartSpan);
    container.appendChild(heartContainer);
    section.append(container);

    //Create levelDisplay
    levelContainer.appendChild(levelDisplay);
    container.appendChild(levelContainer);

    //Create timeDisplay
    timeDisplay.appendChild(timeMinutesDisplay);
    timeDisplay.appendChild(timeDivider);
    timeDisplay.appendChild(timeSecondsDisplay);
    timeContainer.appendChild(timeIcon);
    timeContainer.appendChild(timeDisplay);
    container.appendChild(timeContainer);
  });
};

resetAll();

//Create HTML elements

//Timer
function timer() {
  const secondSpan = document.getElementById("secondsSpan");
  const minutesSpan = document.getElementById("minutesSpan");

  // secondsValue = 00;
  // minutesValue = 00;
  currentInterval = setInterval(() => {
    secondsValue++;

    if (secondsValue === 59) {
      minutesValue++;
      secondsValue = 00;
    }
    if (minutesValue === 59) {
      hoursValue++;
      minutesValue = 00;
    }

    secondSpan.textContent = formatTime(secondsValue);
    minutesSpan.textContent = formatTime(minutesValue);
  }, 1000);
}

//Function to format time
function formatTime(time) {
  return `0${time}`.slice(-2);
}
