//* GLOBAL DOM ELEMENTS
// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const diveLogNode = document.querySelector("#dive-log");

// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//score box
const scoreNode = document.querySelector("#score-value");
const airTimeNode = document.querySelector("#air-time");
const infoExtraAirNode = document.querySelector("#info-extra-air");
const picturesAmountNode = document.querySelector("#pictures-amount");

//--------------------------------------------------------------------------------------------------
//* GLOBAL GAME VARIABLES
let gameIntervalId = null;
let fishSpawnIntervadId = null;
const airDuration = 90; //sec
let airTimeRemaining = airDuration;
let fishSpawnFrequency = 3000;
// let otherDiverSpawnFrequency = ;
let otherDiverAppearanceTime = [80, 40, 15]; // time remaining to end game
let diverObj;
let fishObj;
let cameraObj;
let otherDiverObj;
const fishArray = [];
const allFishNamesAndSizes = [
  {
    fishName: "Yellow-tang",
    w: 50,
    h: 40,
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
    h: 70,
  },
  {
    fishName: "Grey-Angelfish",
    w: 100,
    h: 100,
  },
  {
    fishName: "Flying-gurnard",
    w: 100,
    h: 100,
  },
];
let takingPicture = false;
const picturesTaken = [];
let totalPicturesTaken = 0;
let perfectPictures = 0;
let emptyPictures = 0;
let fishPictures = 0;

//--------------------------------------------------------------------------------------------------
//* GLOBAL GAME FUNCTIONS
function startGame() {
  //1. Hide the start game screen
  //   startScreenNode.style.display = "none";

  //   2. show the game screen
  // Select background style
  setBackground("transparent", "night");
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

  if (otherDiverObj) {
    otherDiverObj.swimHorizontally("Left");
    despawnOtherDiver();
  }
  fishdespawning();

  checkCollisionWithOtherDiver();
  // diverObj.negativeBuoyancyEffect();
}

function handleDiverSwim(event) {
  diverObj.swimHorizontally(event.key);
  diverObj.swimVertically(event.key);
}

function spawnFish() {
  const fishPostitionsArr = [80, 180, 300, 400, 500];
  let randomPosFish = Math.floor(Math.random() * fishPostitionsArr.length);
  let fishPosY = fishPostitionsArr[randomPosFish];

  let randomFishIndex = Math.floor(Math.random() * allFishNamesAndSizes.length);
  fishName = allFishNamesAndSizes[randomFishIndex].fishName;

  fishWidth = allFishNamesAndSizes[randomFishIndex].w;
  fishHeight = allFishNamesAndSizes[randomFishIndex].h;
  if (fishName === "Flying-gurnard") {
    fishPosY = gameBoxNode.offsetHeight - fishHeight;
  }
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

function spawnOtherDiver() {
  let otherDiverRandomPosY = Math.floor(Math.random() * gameBoxNode.offsetHeight - 80);
  otherDiverObj = new OtherDiver(otherDiverRandomPosY);
}

function despawnOtherDiver() {
  if (otherDiverObj.x < 0 - otherDiverObj.w || !otherDiverObj.node.isConnected) {
    otherDiverObj.node.remove();
    otherDiverObj = null;
  }
}

function checkCollisionWithOtherDiver() {
  if (otherDiverObj && checkCollision(diverObj, otherDiverObj)) {
    otherDiverObj.node.remove();
    otherDiverObj = null;
    increaseAir();
  }
}

function positionCameraFocus() {
  if (diverObj.swimmingDirection === "Right") {
    cameraObj.x = diverObj.x + 200; // Update logical position
  } else if (diverObj.swimmingDirection === "Left") {
    cameraObj.x = diverObj.x - 130;
  }
  cameraObj.y = diverObj.y + 15;

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

function increaseAir() {
  let increaseInAir = 5;
  airTimeRemaining += increaseInAir;
  console.log(`increased air by ${increaseInAir}. Now airTimeRemaning : ${airTimeRemaining}`);
  infoExtraAirNode.style.display = "block";
  infoExtraAirNode.innerText = `+${increaseInAir}sec of extra air!`;
  setTimeout(() => {
    infoExtraAirNode.style.display = "none";
  }, 3000);
}

function startTimer() {
  let i = 0;
  let airTimer = setInterval(() => {
    airTimeRemaining--;
    // console.log(airTimeRemaining);
    airTimeNode.innerText = convertTimeRemainingToString(airTimeRemaining);

    // when the user runs out of time we immediatly move to the final page
    if (airTimeRemaining <= 0) {
      clearInterval(airTimer);
      clearInterval(gameIntervalId);
      clearInterval(fishSpawnIntervadId);
      // ensures the timer resets
      // showGameOverScreen();
    } else if (airTimeRemaining === otherDiverAppearanceTime[i]) {
      console.log("time for other diver to appear");
      spawnOtherDiver();
      i++;
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

function showDiveLog() {}

function setBackground(background, dayTime) {
  if (background === "transparent") {
    gameBoxNode.style.backgroundImage = `url("../images/Background_transparent.png")`;
  } else if (background === "normal") {
    gameBoxNode.style.backgroundImage = `url("../images/Background_option1.png")`;
  }

  if (dayTime === "night") {
    gameScreenNode.style.backgroundColor = `rgb(3, 1, 84)`;
  } else if (dayTime === "day") {
    gameBoxNode.style.backgroundColor = `rgb(34, 114, 136)`;
  }
}
//----------------------------------------------------------------------------------------
// EVENT LISTENERS
let focusActive = false;
startGame();
// scoreNode.addEventListener("click", startGame());
document.addEventListener("keydown", handleDiverSwim);

//Show camara Focus
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyX") {
    cameraObj.node.style.display = "block";
    focusActive = true;
  }
});
//Hide camera focus
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyX") {
    cameraObj.node.style.display = "none";
    focusActive = false;
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
//Return to normal transparent background
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyZ") {
    if (!focusActive) {
      cameraObj.node.style.display = "none";
    } else {
      cameraObj.node.style.backgroundColor = "transparent";
    }
  }
});

//Prevent screen from scrolling when using arrows
document.addEventListener("keydown", function (event) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "PageUp", "PageDown"];

  if (keysToBlock.includes(event.key)) {
    event.preventDefault();
  }
});
