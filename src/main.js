//* GLOBAL DOM ELEMENTS
// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//Elements in Start screen
const startBtnNode = document.querySelector("#start-btn");
const nightThemeBtn = document.querySelector("#night-theme");
const dayThemeNode = document.querySelector("#day-theme");
const themeArticles = document.querySelectorAll("#themes article");
const playerNameInput = document.querySelector("#player-name");
const showInstructionsBtn = document.getElementById("show-instructions-btn");
const instructionsNode = document.getElementById("instructions");
const closeInstructionsBtn = document.getElementById("close-instructions");

//Elements in Game Screen
// game box
const gameBoxNode = document.querySelector("#game-box");

//Elements in game info row
const airTimeNode = document.querySelector("#air-time");
const boxAnnouncementExtraAir = document.querySelector("#announcement-extra-air");
const infoExtraAirNode = document.querySelector("#info-extra-air");
const picturesAmountNode = document.querySelector("#pictures-amount");
const perfectPicturesNode = document.querySelector("#perfect-pictures-amount");
const scoreNodes = document.querySelectorAll(".score");

//Elements in game over screen
const diveLogFishCardsContainerNode = document.querySelector("#fish-cards-container");
const picturesTakenNode_gameOverScreen = document.querySelector("#pictures-taken");
const perfectPictures_gameOverScreen = document.querySelector("#perfect-taken");
const speciesPhotographed = document.querySelector("#species-photographed");
const totalSpecies = document.querySelector("#total-species");
const rankingSubBox = document.querySelector("#ranking-sub-box");
const restartBtnNode = document.querySelector("#btn-restart");

//audio
const cameraClickAudio = new Audio("./audio/singleCamaraClick.wav");
const diverEntrySound = new Audio("./audio/diverEntrySound.wav");
const streamUnderWaterAudio = new Audio("./audio/stream_underwater.ogg");
const yaySound = new Audio("./audio/Yay.wav");
const perfectPictureSound = new Audio("./audio/perfectSound.mp3");
streamUnderWaterAudio.volume = 0.2;

//--------------------------------------------------------------------------------------------------
//* GLOBAL GAME VARIABLES
let gameIntervalId = null;
let fishSpawnIntervadId = null;
const airDuration = 45; //sec
let airTimeRemaining = airDuration;
let fishSpawnFrequency = 1500;
let otherDiverAppearanceTime = [airDuration - 10, airDuration - 30, airDuration - 44];
// let otherDiverAppearanceTime = [5];
let diverObj;
let fishObj;
let cameraObj;
let otherDiverObj;
const fishArray = [];
const screenYPositionsForFishSpawningArr = [];

let cameraBoxWidth = 110;
let cameraBoxHeight = 90;

//Picture related variables
const keyForShowingFocus = "KeyZ";
const keyForTakingPicture = "KeyX";
let takingPicture = false;
let totalPicturesTaken = 0;
const picturesTaken = [];
let perfectPictures = 0;
const perfectPicturesArr = [];
let emptyPictures = 0;
let fishPictures = 0;
let score = 0;
let pointsPerPerfectPictureDifficulty = 1000;

//General settings variables
let selectedTheme = "night";
let playerName = "";

//--------------------------------------------------------------------------------------------------
//* GLOBAL GAME FUNCTIONS
function startGame() {
  console.log("Game Started");
  //1. Hide the start game screen
  startScreenNode.style.display = "none";

  //2. Set Background for game screen
  setBackground(selectedTheme);

  //3. . show the game screen
  gameScreenNode.style.display = "flex";
  calculatePositionsForFishSpawning(4);

  //3. add any inital elements to the game
  diverObj = new Diver();
  console.log(diverObj);
  cameraObj = new Camara(diverObj.x + 200, diverObj.y + 50, cameraBoxWidth, cameraBoxHeight);
  console.log(cameraObj);

  diverEntrySound.currentTime = 0;
  diverEntrySound.play();
  console.log("Audio dive entry sound duration:", diverEntrySound.duration, "seconds");
  streamUnderWaterAudio.currentTime = 0;
  streamUnderWaterAudio.play();
  //Start air timer
  startTimer();

  // 4. start the game loop (interval)
  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

  //5. We start any other interval or timeout that we may need
  fishSpawnIntervadId = setInterval(spawnFish, fishSpawnFrequency);
  // setInterval(diverObj.negativeBuoyancyEffect(), 1000);
}
function gameOver() {
  console.log("gameOver");
  clearInterval(gameIntervalId);
  //hide game screen
  gameScreenNode.style.display = "none";
  //stop audio
  streamUnderWaterAudio.pause();
  streamUnderWaterAudio.currentTime = 0;

  //Show game over screen
  let scoresFile = JSON.parse(localStorage.getItem("shutterDiveScores")) || [];
  scoresFile.push({ name: playerName, score: score });
  localStorage.setItem("shutterDiveScores", JSON.stringify(scoresFile));

  gameOverScreenNode.style.display = "flex";
  showDiveLog();
  updateGeneralResultsBox();
  updateRanking();
}

function updateGeneralResultsBox() {
  picturesTakenNode_gameOverScreen.innerText = picturesTaken.length;
  perfectPictures_gameOverScreen.innerText = perfectPictures;
  scoreNodes.forEach((scoreNode) => {
    scoreNode.innerText = score;
  });
}
function clearAllRankings() {
  localStorage.removeItem("shutterDiveScores");
}
// clearAllRankings();
function updateRanking() {
  let scores = JSON.parse(localStorage.getItem("shutterDiveScores")) || [];
  // Sort
  scores.sort((a, b) => b.score - a.score);

  // clean before writting
  rankingSubBox.innerHTML = `
    <article class="row-ranking">
      <p>Player name</p>
      <p>Score</p>
    </article>
  `;
  scores.forEach((entry) => {
    rankingSubBox.innerHTML += `
      <article class="row-ranking">
        <p>${entry.name}</p>
        <p>${entry.score}</p>
      </article>
    `;
    console.log(`${entry.name}: ${entry.score}`);
  });
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
  if (diverObj) {
    diverObj.swimHorizontally(event.key);
    diverObj.swimVertically(event.key);
  }
}
function calculatePositionsForFishSpawning(numPoints) {
  console.log(`Game box height is: ${gameBoxNode.offsetHeight}`);
  for (let i = 1; i <= numPoints; i++) {
    // Divide the height into equal segments
    const pos = Math.round((gameBoxNode.offsetHeight / (numPoints + 1)) * i);
    screenYPositionsForFishSpawningArr.push(pos);
  }
  console.log(`Fish will appear in pos Y = [${screenYPositionsForFishSpawningArr}]`);
}
function spawnFish() {
  // const fishPostitionsArr = [80, 180, 300, 400, 500];
  let randomPosFish = Math.floor(Math.random() * screenYPositionsForFishSpawningArr.length);
  let fishPosY = screenYPositionsForFishSpawningArr[randomPosFish];

  let randomFishIndex = Math.floor(Math.random() * allFishNamesAndSizes.length);
  let randomFish = allFishNamesAndSizes[randomFishIndex];

  if (randomFish.fishName === "Flying-gurnard") {
    fishPosY = gameBoxNode.offsetHeight - randomFish.h - 40;
  }
  fishArray.push(new Fish(randomFish, undefined, fishPosY));
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
  let otherDiverRandomPosY = Math.floor(Math.random() * gameBoxNode.offsetHeight);
  if (otherDiverRandomPosY === gameBoxNode.offsetHeight) {
    otherDiverRandomPosY -= 80;
  }
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
    yaySound.currentTime = 0;
    yaySound.play();
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

function checkCollision(element1, element2) {
  if (element1.x < element2.x + element2.w && element1.x + element1.w > element2.x && element1.y < element2.y + element2.h && element1.y + element1.h > element2.y) {
    return true;
  } else {
    return false;
  }
}

function increaseAir() {
  let increaseInAir = 10; //sec
  airTimeRemaining += increaseInAir;
  console.log(`increased air by ${increaseInAir}. Now airTimeRemaning : ${airTimeRemaining}`);
  boxAnnouncementExtraAir.style.display = "block";
  infoExtraAirNode.innerText = `+${increaseInAir} sec of extra air!`;
  setTimeout(() => {
    boxAnnouncementExtraAir.style.display = "none";
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
      gameOver();
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

function showDiveLog() {
  console.log(`Pictures taken: ${picturesTaken}`);
  console.log(`Perfect pictures taken: ${perfectPictures}`);

  let diveLogFishArr = [];
  let count = 0;

  allFishNamesAndSizes.forEach((fish) => {
    // console.log(`fish: ${fish.fishName}: array filtered: ${picturesTaken.filter((picture) => picture === fish.fishName)}`);
    diveLogFishArr.push({
      fishName: fish.fishName,
      pictures: picturesTaken.filter((picture) => picture === fish.fishName).length,
      perfectPictures: perfectPicturesArr.filter((picture) => picture === fish.fishName).length,
      srcPicture: fish.src,
    });
  });

  let speciesPhotographedArr = diveLogFishArr.filter((fish) => fish.pictures > 0);
  console.log(`Species photgraphed: ${speciesPhotographedArr}`);

  //Sort by amount of pictures taken
  let wordPics = "";
  diveLogFishArr.sort((a, b) => b.pictures - a.pictures);
  diveLogFishArr.forEach((fish) => {
    if (fish.pictures === 1) {
      wordPics = "pic";
    } else {
      wordPics = "pics";
    }
    //prettier-ignore
    diveLogFishCardsContainerNode.innerHTML += 
      `<article class="fish-card">
        <div class="fish-picture-and-name">
          <img class="fish-image" src="${fish.srcPicture}" alt="${fish.fishName}" />
          <p class="fish-name-card">${fish.fishName}</p>
        </div>
        <p class="fish-pictures">${fish.pictures} ${wordPics}</p>
        <p class="fish-pictures">${fish.perfectPictures} <span class="green"> perfect</span></p>
       </article>
      `;
  });
  speciesPhotographed.innerText = speciesPhotographedArr.length;
  totalSpecies.innerText = allFishNamesAndSizes.length;
}

function capturePicture() {
  cameraClickAudio.currentTime = 0; //restart audio in case it triggers too fast
  cameraClickAudio.play();
  cameraObj.node.style.display = "block";
  cameraObj.node.style.border = "1px solid black";
  cameraObj.node.style.backgroundColor = "rgba(185, 178, 134, 0.5)";
  totalPicturesTaken++;
  picturesAmountNode.innerText = totalPicturesTaken;
  // console.log(`Total pictures: ${totalPicturesTaken}`);
  // console.log(`Pictures without fish: ${totalPicturesTaken - fishPictures}`);
  let cameraRight = cameraObj.x + cameraObj.w;
  let cameraBottom = cameraObj.y + cameraObj.h;

  fishArray.forEach((fish) => {
    if (checkCollision(cameraObj, fish)) {
      //Points for picture that has a fish
      score += 500;

      let fishRigth = fish.x + fish.w;
      let fishBottom = fish.y + fish.h;

      // console.log(`position camera: x:${cameraObj.x} -${cameraRight}, y:${cameraObj.y}-${cameraBottom}`);
      // console.log(`position fish:   x:${fish.x}-${fishRigth}, y:${fish.y}-${fishBottom}`);
      // prettier-ignore
      if (cameraObj.x <= fish.x && cameraRight >= fishRigth && 
          cameraObj.y <= fish.y && cameraBottom >= fishBottom) {
            cameraObj.node.style.backgroundColor = "rgba(112, 234, 128, 0.5)"
            cameraObj.pictureQualityNode.style.display = "block"
            cameraObj.pictureQualityNode.innerText = "Perfect!"
            //timeout for showing "perfect" next to the camera box
            setTimeout(() => {
              cameraObj.pictureQualityNode.style.display = "none"
            }, 700);
              perfectPictureSound.currentTime = 0;
              perfectPictureSound.play();
            perfectPictures++;
            perfectPicturesNode.innerText = perfectPictures; 
            score -= 500
            score += fish.scorePoints;
            perfectPicturesArr.push(fish.fishType)
      }

      // console.log(fish.fishType);
      fishPictures++;
      picturesTaken.push(fish.fishType);
      // console.log(`Fish pictures: ${fishPictures}`);
    }
  });
  scoreNodes.forEach((scoreNode) => {
    scoreNode.innerText = score;
  });
}

function restartGame() {
  //1. Hide the game over screen
  gameOverScreenNode.style.display = "none";
  playerNameInput.value = "";

  // Clear arrays in-place
  picturesTaken.length = 0;
  fishArray.forEach((fish) => fish.node.remove());
  fishArray.length = 0;

  // Reset counters
  totalPicturesTaken = 0;
  perfectPictures = 0;
  emptyPictures = 0;
  fishPictures = 0;
  score = 0;
  airTimeRemaining = airDuration;

  // Reset UI & DOM
  picturesAmountNode.innerText = "0";
  perfectPicturesNode.innerText = "0";
  scoreNodes.forEach((scoreNode) => {
    scoreNode.innerText = "0";
  });
  diveLogFishCardsContainerNode.innerHTML = "";
  diverObj.node.remove();
  if (otherDiverObj) {
    otherDiverObj.node.remove();
  }

  //2. Show start screen
  startScreenNode.style.display = "flex";
}

function setBackground(theme) {
  if (theme === "night") {
    gameBoxNode.style.backgroundImage = `url("./images/Background_transparent.PNG")`;
    gameScreenNode.style.backgroundColor = `rgb(3, 1, 84)`;
  } else if (theme === "day") {
    gameBoxNode.style.backgroundImage = `url("./images/Background_option1.png")`;
    gameScreenNode.style.backgroundColor = `rgb(34, 114, 136)`;
  }
}
calculateFishAreaAndScores();
function calculateFishAreaAndScores() {
  let cameraArea = cameraBoxWidth * cameraBoxHeight;
  console.log(`Camera area: ${cameraArea}`);

  allFishNamesAndSizes.forEach((fish) => {
    //Calculate area of the fish image and its relationship with the camera's area
    fish["area"] = fish.w * fish.h;
    fish["Relationship-camaraBox %"] = Math.round((fish.area / cameraArea) * 10000) / 100;
    fish["Relationship-camaraBox diff"] = cameraArea - fish.area;

    //Set difficulty for perfect picture depending on the area that the fish occuppies from the camera box
    if (fish["Relationship-camaraBox %"] >= 70) {
      fish["perfect-picture-difficulty"] = 3; // high
    } else if (fish["Relationship-camaraBox %"] >= 50 && fish["Relationship-camaraBox %"] < 70) {
      fish["perfect-picture-difficulty"] = 2; // medium
    } else {
      fish["perfect-picture-difficulty"] = 1; // Easy
    }
    fish["perfect-picture-score"] = fish["perfect-picture-difficulty"] * pointsPerPerfectPictureDifficulty;
  });

  console.log(allFishNamesAndSizes);
}
//----------------------------------------------------------------------------------------
// EVENT LISTENERS
let focusActive = false;
startBtnNode.addEventListener("click", () => {
  playerName = playerNameInput.value.trim() || "Anonymous";
  startGame();
});

nightThemeBtn.addEventListener("click", () => {
  console.log("Night theme clicked");
  selectedTheme = "night";
  themeArticles.forEach((article) => article.classList.remove("selected-theme"));
  nightThemeBtn.classList.toggle("selected-theme");
});

dayThemeNode.addEventListener("click", () => {
  selectedTheme = "day";
  themeArticles.forEach((article) => article.classList.remove("selected-theme"));
  dayThemeNode.classList.add("selected-theme");
});

document.addEventListener("keydown", handleDiverSwim);

//Show camara Focus
document.addEventListener("keydown", (event) => {
  if (event.code === keyForShowingFocus) {
    cameraObj.node.style.display = "block";
    cameraObj.node.style.border = "2px dashed black";
    cameraObj.node.style.backgroundColor = "transparent";
    focusActive = true;
  }
});
//Hide camera focus
document.addEventListener("keyup", (event) => {
  if (event.code === keyForShowingFocus) {
    cameraObj.node.style.display = "none";
    focusActive = false;
  }
});

//Take picture when "Key Y" is pressed
document.addEventListener("keydown", (event) => {
  if (event.code === keyForTakingPicture) {
    capturePicture();
  }
});

//Return camera focus to normal transparent background after taking a picture
document.addEventListener("keyup", (event) => {
  if (event.code === keyForTakingPicture) {
    if (focusActive === false) {
      cameraObj.node.style.display = "none";
    } else {
      cameraObj.node.style.backgroundColor = "transparent";
      cameraObj.node.style.border = "2px dashed black";
    }
  }
});

//Restart button
restartBtnNode.addEventListener("click", restartGame);

//Prevent screen from scrolling when using arrows
document.addEventListener("keydown", function (event) {
  const keysToBlock = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "PageUp", "PageDown"];

  if (keysToBlock.includes(event.key)) {
    event.preventDefault();
  }
});

showInstructionsBtn.addEventListener("click", () => {
  instructionsNode.style.display = instructionsNode.style.display === "none" ? "block" : "none";
});

closeInstructionsBtn.addEventListener("click", () => {
  instructionsNode.style.display = "none";
});
