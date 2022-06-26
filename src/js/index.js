const keyboard = document.getElementById("keyboard");
const grid = document.getElementById("grid");
const section = document.getElementById("section");

const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
let myAnswer = [];
let level = 0;
let lives = ["1", "2", "3"];

const data = [
  {
    word: "hero",
    image: "https://4pics1-word.com/data/images_big/1434.jpg",
  },
  {
    word: "cold",
    image: "https://4pics1-word.com/data/images_big/12.jpg",
  },
  {
    word: "wine",
    image: "https://4pics1-word.com/data/images_big/125.jpg",
  },
  {
    word: "bug",
    image: "https://4pics1word.ws/images/answers/bug.png",
  },
  {
    word: "leaf",
    image: "https://4pics1-word.com/data/images_big/5768.jpg",
  },
  {
    word: "mouse",
    image: "https://4pics1-word.com/data/images_big/477.jpg",
  },
  {
    word: "space",
    image: "https://4pics1word.ws/images/answers/space.png",
  },
];

const onlyLevel = data.map((item) => item.word);
const onlyImage = data.map((item) => item.image);

let currentLevel = onlyLevel[level];
let currentImage = onlyImage[level];
let secretWord = [...currentLevel];

let position = [];
let row = [];

const pressLetter = () => {
  const btn = event.target; //Selecciona el elemento que hacemos click y devuelve todos sus parametros
  const enterBtn = document.getElementById("enter");
  if (myAnswer.length < secretWord.length) {
    myAnswer.push(btn.id);
    const currentItem = document.getElementById(`tile-${myAnswer.length}`);
    currentItem.textContent = btn.textContent;
    // console.log(myAnswer.length);
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

// const title = () =>{
//   const main = document.getElementById("main");
//   const titleContainer = document.createElement("div");
//   titleContainer.classList.add("title-container");
//   const title = document.createElement("h1");
//   title.classList.add("title");
//   title.textContent = "4 pics 1 word";

//   titleContainer.appendChild(title);
//   section.appendChild(titleContainer);
// }

//
const wordTiles = () => {
  row = [];

  const game = document.getElementById("game");
  const list = document.createElement("ul");
  list.classList.add("grid-row");
  secretWord.map((tile) => {
    const listItem = document.createElement("li");
    listItem.classList.add("grid-tiles");
    listItem.id = `tile-${secretWord.indexOf(tile) + 1}`;
    list.appendChild(listItem);
    row.push(list);
  });
  // for (let tile = 0; tile < secretWord.length; tile++) {
  //   const listItem = document.createElement("li");
  //   listItem.classList.add("grid-tiles");
  //   listItem.id = `tile-${tile + 1}`;
  //   list.appendChild(listItem);
  //   row.push(list);
  // }
  game.append(...row);
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
      console.log(item, color);
      item.classList.add(color);
    });

    if (position.every((positions) => positions === "correct")) {
      //Para saber si todos cumplen la condicion
      if (level === onlyLevel.length - 1) {
        level = 0;
      } else {
        level++;
        currentLevel = onlyLevel[level];
        secretWord = [...currentLevel];
        currentImage = onlyImage[level];
        console.log(`levelArray`, onlyLevel[level]);
        console.log(`level`, level);
        console.log(`secret`, secretWord);
        myAnswer = [];
        position = [];

        setTimeout(() => {
          //Winner popup
          lives = ["1", "2", "3"];
          resetAll();
        }, 600);
      }
    } else {
      //Delete Tiles
      setTimeout(() => {
        deteleteLives();
        resetAll();
      }, 900);
    }
  } else {
    console.log(`Checking...`);
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
  createHeart();
  img();
  wordTiles();
  enterBtn.disabled = true;
};

const winner = () => {};

//Se puede hacer en el else de checkWord
const deteleteLives = () => {
  if (lives.length > 0) {
    lives.pop();
  } else {
    //No lives found
    console.log(`You have ${lives}`);
  }
};

const createHeart = () => {
  const section = document.getElementById(`section`);
  const container = document.createElement("div");
  container.className = "heart-container";

  lives.map((life) => {
    const heartContainer = document.createElement("span");
    heartContainer.className = "heart";
    heartContainer.setAttribute("id", `heart-${life}`);
    const heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart");

    //Create hearts
    heartContainer.appendChild(heart);
    container.appendChild(heartContainer);
    section.append(container);
  });
};

resetAll();
//Create HTML elements
