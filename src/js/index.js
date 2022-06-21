//Wordle clon
const keyboard = document.getElementById("keyboard");
// const wordle = document.querySelector(".wordle");

const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
const myAnswer = [];
const secretWord = ["p", "l", "a", "t", "z"];
let position = [];

const pressLetter = () => {
  const btn = event.target; //Selecciona el elemento que hacemos click y devuelve todos sus parametros
  if (myAnswer.length < 5) {
    myAnswer.push(btn.id);
    console.log(myAnswer);
  }else{
    console.log(`wordl complete`)
  }
};

const checkWord = () => {
  if (myAnswer.length === 5) {
    if (myAnswer.join("") === secretWord.join("")) {
      console.log(`win`);
    } else {
      for (let i = 0; i < 5; i++) {
        switch (true) {
          case myAnswer[i] === secretWord[i]:
            position.push("green");
            break;
          case secretWord.includes(myAnswer[i]):
            position.push("marron");
            break;
          default:
            position.push(`No exist`);
            break;
        }
      }
      console.log(position);
    }
  } else {
    console.log(`incomplete`);
  }
  // console.log(`Checking...`);
};
const deleteLetter = () => {
  myAnswer.length > 0 ? myAnswer.pop() : console.log(`Deleting..`, myAnswer);
};

keyboardLetters.map((letters) => {
  const list = document.createElement("ul");
  letters.map((letter) => {
    const listItem = document.createElement("li");
    const btnLetter = document.createElement("button");
    btnLetter.classList.add("keyboard-letter");
    btnLetter.setAttribute("id", `${letter}`);
    btnLetter.textContent = letter;
    switch (letter) {
      case "enter":
        listItem.addEventListener("click", checkWord);
        break;
      case "delete":
        listItem.addEventListener("click", deleteLetter);
        break;
      default:
        btnLetter.addEventListener("click", pressLetter);
    }

    listItem.appendChild(btnLetter);
    list.appendChild(listItem);
  });
  listElements.push(list);
});
keyboard.append(...listElements);
