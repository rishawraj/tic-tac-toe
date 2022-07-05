const gameBoard = (function () {
  let boardArr = ["x", "o", "", "", "", "", "", "", "", ""];

  // cache dom
  const board = document.querySelector(".board");
  const boxes = document.querySelectorAll("[data-number]");
  const resetBtn = document.querySelector("#resetBtn");
  // console.log(boxes);

  // render
  render();

  function render() {
    boxes.forEach((box, index) => {
      // console.log(index);
      box.textContent = boardArr[index];
    });
  }

  function reset() {
    for (let i = 0; i < boardArr.length; i++) {
      boardArr[i] = "";
    }
    render();
  }

  // click events
  board.addEventListener("click", (e) => {
    let number = e.target.getAttribute("data-number");
    let text = e.target.textContent;
    // console.log(text === "");
    if (number !== null && text === "") {
      boardArr[number] = "x";
    }
    render();
  });

  // reset
  resetBtn.addEventListener("click", reset);

  // return { reset, render };
})();

const players = {};
const gameFlow = {};
