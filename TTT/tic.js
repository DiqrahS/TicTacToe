let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let click = 0;

let turn0 = true; //playX, play0

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const resetGame = () => {
  turn0 = true;
  click = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `** Congratulations, Winner is ${winner} **`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !="" && pos2Val !="" && pos3Val !="") {
      if (pos1Val === pos2Val && pos2Val ===pos3Val) {
        showWinner(pos1Val);
      }
    } 
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
   if (turn0) {
    box.innerText= "O";
    turn0=false;
   } else {
    box.innerText= "X";
    turn0=true;
   }
   box.disabled = true;
   click++;

   let isWinner = checkWinner();
   if (click === 9 && !isWinner) {
    gameDraw();
   }
  });
});
const gameDraw = () => {
  msg.innerText = `** DRAW, Please Restart the GAME **`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
