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
let fishSpawnFrequency = 2000;
let diverObj;
let fishObj;
let camaraObj;
const fishArray = [];
const allFishNamesAndSizes = [
  {
    fishName: "Yellow-tang",
    w: 80,
    h: 50,
  },
  {
    fishName: "Blue-tang",
    w: 70,
    h: 90,
  },
  {
    fishName: "Parrotfish",
    w: 100,
    h: 70,
  },
  {
    fishName: "Greenturtle",
    w: 100,
    h: 100,
  },
];
const fishPostitionsArr = [80, 180, 300];
let fishIndex = 0;

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
  camaraObj = new Camara(diverObj.x + 200, diverObj.y + 50, 80, 50);

  // 4. start the game loop (interval)
  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

  //5. We start any other interval or timeout that we may need
  fishSpawnIntervadId = setInterval(spawnFish, fishSpawnFrequency);
}

function gameLoop() {
  positionCameraFocus();
  fishArray.forEach((fish) => {
    fish.swimHorizontally("Left");
  });

  // fishdespawning();
}

function handleDiverSwim(event) {
  diverObj.swimHorizontally(event.key);
  diverObj.swimVertically(event.key);
}

// function checkDiverWallCollition(wallPosition) {
//   if (wallPosition === "RightWall") {
//     diverObj.changeSwimDirection("toLeft");
//   }

function spawnFish(position) {
  if (position === "Top-third") {
  }
  let randomPosFish = Math.floor(Math.random() * fishPostitionsArr.length);
  let fishPosY = fishPostitionsArr[randomPosFish];

  let randomFishIndex = Math.floor(Math.random() * allFishNamesAndSizes.length);
  fishName = allFishNamesAndSizes[randomFishIndex].fishName;
  fishWidth = allFishNamesAndSizes[randomFishIndex].w;
  fishHeight = allFishNamesAndSizes[randomFishIndex].h;
  fishArray.push(new Fish(fishName, undefined, fishPosY, fishWidth, fishHeight));
}
function fishdespawning() {
  console.log(fishArray[0], fishArray[0].x);
  if (fishArray[0] && fishArray[0].x < [0 - fishArray[0].w]) {
    //destroy the first obstacle
    //! To remove elements from the game we need to consider both environments
    fishArray[0].node.remove(); //removes from the DOM
    fishArray.shift();
  }
}

function positionCameraFocus() {
  if (diverObj.swimmingDirection === "Right") {
    camaraObj.x = diverObj.x + 200; // Update logical position
  } else if (diverObj.swimmingDirection === "Left") {
    camaraObj.x = diverObj.x - 80;
  }
  camaraObj.y = diverObj.y + 50;

  camaraObj.node.style.left = `${camaraObj.x}px`; // update DOM position
  camaraObj.node.style.top = `${camaraObj.y}px`; // update DOM position
}

//----------------------------------------------------------------------------------------
// EVENT LISTENERS
startGame();
// scoreNode.addEventListener("click", startGame());
document.addEventListener("keydown", handleDiverSwim);

//Show camara Focus
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyX") {
    camaraObj.node.style.display = "block";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "KeyX") {
    camaraObj.node.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "PageUp", "PageDown"];

  if (keysToBlock.includes(event.key)) {
    event.preventDefault();
  }
});
