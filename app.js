// ! rewrite in module pattern!!!

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxElements = document.querySelectorAll("[data-box]");
const board = document.getElementById("board");
const winningMessageElement = document.querySelector(".winning-message");
const winningMessageTextElement = document.querySelector(
  "[data-winning-mesaage]"
);
const restartBtn = document.getElementById("resetBtn");
let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;

  boxElements.forEach((box) => {
    box.classList.remove(X_CLASS);
    box.classList.remove(CIRCLE_CLASS);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place mark
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return boxElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.textContent = "draw";
  } else {
    winningMessageTextElement.textContent = `${
      circleTurn ? "O's" : "X's"
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}
function isDraw() {
  return [...boxElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
