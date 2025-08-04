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
const scoreNode = document.querySelector("#score-value");
const airTimeNode = document.querySelector("#air-time");
const picturesAmountNode = document.querySelector("#pictures-amount");

//* GLOBAL GAME VARIABLES
let gameIntervalId = null;
let fishSpawnIntervadId = null;
const airDuration = 120; //sec
let airTimeRemaining = airDuration;
let fishSpawnFrequency = 3000;
let diverObj;
let fishObj;
let cameraObj;
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
    h: 50,
  },
  {
    fishName: "Parrotfish",
    w: 100,
    h: 50,
  },
  {
    fishName: "Greenturtle",
    w: 100,
    h: 100,
  },
];
const fishPostitionsArr = [80, 180, 300];

let takingPicture = false;
const picturesTaken = [];
let totalPicturesTaken = 0;
let perfectPictures = 0;
let emptyPictures = 0;
let fishPictures = 0;
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
  cameraObj = new Camara(diverObj.x + 200, diverObj.y + 50, 110, 80);
  console.log(cameraObj);

  startTimer();

  // 4. start the game loop (interval)
  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

  //5. We start any other interval or timeout that we may need
  fishSpawnIntervadId = setInterval(spawnFish, fishSpawnFrequency);
  // setInterval(diverObj.negativeBuoyancyEffect(), 1000);
}

function gameLoop() {
  positionCameraFocus();
  fishArray.forEach((fish) => {
    fish.swimHorizontally("Left");
  });
  fishdespawning();
  // capturePicture();
  // diverObj.negativeBuoyancyEffect();
}

function handleDiverSwim(event) {
  diverObj.swimHorizontally(event.key);
  diverObj.swimVertically(event.key);
}

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
  if (fishArray[0] && fishArray[0].x < [0 - fishArray[0].w]) {
    //destroy the first obstacle
    //! To remove elements from the game we need to consider both environments
    fishArray[0].node.remove(); //removes from the DOM
    fishArray.shift();
  }
}

function positionCameraFocus() {
  if (diverObj.swimmingDirection === "Right") {
    cameraObj.x = diverObj.x + 200; // Update logical position
  } else if (diverObj.swimmingDirection === "Left") {
    cameraObj.x = diverObj.x - 80;
  }
  cameraObj.y = diverObj.y + 50;

  cameraObj.node.style.left = `${cameraObj.x}px`; // update DOM position
  cameraObj.node.style.top = `${cameraObj.y}px`; // update DOM position
}

function capturePicture() {
  fishArray.forEach((fish) => {
    if (checkCollision(cameraObj, fish)) {
      if (takingPicture) {
        scoreNode.innerText++;
      }
    }
  });
}
function checkCollision(element1, element2) {
  if (element1.x < element2.x + element2.w && element1.x + element1.w > element2.x && element1.y < element2.y + element2.h && element1.y + element1.h > element2.y) {
    return true;
  } else {
    return false;
  }
}
function startTimer() {
  let airTimer = setInterval(() => {
    airTimeRemaining--;
    airTimeNode.innerText = convertTimeRemainingToString(airTimeRemaining);

    // when the user runs out of time we immediatly move to the final page
    if (airTimeRemaining <= 0) {
      clearInterval(airTimer);
      clearInterval(gameIntervalId);
      clearInterval(fishSpawnIntervadId);
      // ensures the timer resets
      // showGameOverScreen();
    }
  }, 1000);
  // return airTimer;
}
function convertTimeRemainingToString(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function gameOver() {
  clearInterval(gameIntervalId);
}
//----------------------------------------------------------------------------------------
// EVENT LISTENERS
startGame();
// scoreNode.addEventListener("click", startGame());
document.addEventListener("keydown", handleDiverSwim);

//Show camara Focus
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyX") {
    cameraObj.node.style.display = "block";
  }
});
//Hide camera focus
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyX") {
    cameraObj.node.style.display = "none";
  }
});

//Take picture (background of the focus changes and "Click" sounds)
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyZ") {
    cameraObj.node.style.display = "block";
    cameraObj.node.style.backgroundColor = "rgba(185, 178, 134, 0.5)";
    totalPicturesTaken++;
    picturesAmountNode.innerText = totalPicturesTaken;
    console.log(`Total pictures: ${totalPicturesTaken}`);
    // console.log(`Pictures without fish: ${totalPicturesTaken - fishPictures}`);
    scoreNode.innerText = totalPicturesTaken;
    let cameraRight = cameraObj.x + cameraObj.w;
    let cameraBottom = cameraObj.y + cameraObj.h;

    fishArray.forEach((fish) => {
      if (checkCollision(cameraObj, fish)) {
        let fishRigth = fish.x + fish.w;
        let fishBottom = fish.y + fish.h;
        // console.log(`position camera: x:${cameraObj.x} -${cameraRight}, y:${cameraObj.y}-${cameraBottom}`);
        // console.log(`position fish:   x:${fish.x}-${fishRigth}, y:${fish.y}-${fishBottom}`);
        // prettier-ignore
        if (cameraObj.x <= fish.x && cameraRight >= fishRigth && 
            cameraObj.y <= fish.y && cameraBottom >= fishBottom) {
            perfectPictures++;
            console.log(`Perfect pictures: ${perfectPictures}`)
        }

        console.log(fish.fishType);
        fishPictures++;
        console.log(`Fish pictures: ${fishPictures}`);
      }
    });
    //todo Add Click sound
  }
});
//Return to normal transparend background
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyZ") {
    cameraObj.node.style.display = "none";
    cameraObj.node.style.backgroundColor = "transparent";
  }
});

//Prevent screen from scrolling when using arrows
document.addEventListener("keydown", function (event) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "PageUp", "PageDown"];

  if (keysToBlock.includes(event.key)) {
    event.preventDefault();
  }
});
