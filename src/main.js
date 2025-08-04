//* GLOBAL DOM ELEMENTS
// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//score box
const scoreNode = document.querySelector("#score");

//* GLOBAL GAME VARIABLES
let gameIntervalId = null;
let diverObj;
let fishObj;

//* GLOBAL GAME FUNCTIONS
function startGame() {
  console.log("hola");
  //1. Hide the start game screen
  //   startScreenNode.style.display = "none";

  //   2. show the game screen
  gameScreenNode.style.display = "flex";

  //3. add any inital elements to the game
  diverObj = new Diver();
  console.log(diverObj);
  fishObj = new Fish();

  // 4. start the game loop (interval)
  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

  //5. We start any other interval or timeout that we may need
}

function gameLoop() {
  //   console.log("gameLoop");
  fishObj.fishSwim();
}

//* EVENT LISTENERS
startGame();
// scoreNode.addEventListener("click", startGame());
document.addEventListener("keydown", handleDiverSwim);

function handleDiverSwim(event) {
  diverObj.swimHorizontally(event.key);
  diverObj.swimVertically(event.key);
}

document.addEventListener("keydown", function (event) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "PageUp", "PageDown"];

  if (keysToBlock.includes(event.key)) {
    event.preventDefault();
  }
});
// function checkDiverWallCollition(wallPosition) {
//   if (wallPosition === "RightWall") {
//     diverObj.changeSwimDirection("toLeft");
//   }
