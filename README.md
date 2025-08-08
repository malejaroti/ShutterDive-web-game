NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README.

# NAME OF YOUR PROYECT

## [Play the Game!](https://malejaroti.github.io/ShutterDive-web-game/)

![Game Logo](www.your-image-logo-here.com)

# Description

Shutter Dive is an underwater photography game where you control a diver, take pictures of marine life, and try to get perfect shots for extra points!

# Main Functionalities

- Move the diver with arrow keys
- Show camera focus with Z
- Take pictures with X
- Score system for photos and perfect shots
- Air timer and extra air from other divers
- Ranking system with local storage

# Backlog Functionalities

- Different game modes, e.g. :
  - "The collector": Goal is to photograph all species
  - "The identifier" Type the name of the animal you photographed
- More fish species

# Technologies used

- HTML, CSS, Javascript, DOM Manipulation, Local Storage.

# States

- Start screen
- Game screen
- Game over / Dive log screen

# Proyect Structure

- main.js: Handles DOM, game logic, event listeners
- Element.js: Base class for element positioning and swimming movement.
- Diver.js: Diver logic
- OtherDiver.js: Other diver logic
- Fish.js: Fish logic
- Camara.js: Camera logic

## main.js

- Handles DOM, game logic, event listeners.

### Functions

#### Game Flow & State

- startGame()
- gameOver()
- restartGame()
- startTimer()
- gameLoop()
- handleDiverSwim(event)

#### Score logic

- calculateFishAreaAndScores()

#### Fish management

- calculatePositionsForFishSpawning(numPoints)
- spawnFish()
- fishdespawning()

#### Collisions with other diver and air management

- spawnOtherDiver()
- despawnOtherDiver()
- checkCollisionWithOtherDiver()
- increaseAir()

#### Picture management

- positionCameraFocus()
- capturePicture()

#### Game over screen management

- showDiveLog()
- updateGeneralResultsBox()
- updateRanking()

#### Additional helper functions

- checkCollision(element1, element2)
- clearAllRankings()
- convertTimeRemainingToString(time)

## Fish.js

Contains an array of fish objects, with the source of the image, and the size it will have in the game. Each object looks like this:  
{
fishName: "Yellow cowfish",
src: `./images/Fish-yellow-cowfish.png`,
w: 60,
h: 50,
},

# Extra Links

### Sketch

[Link](https://excalidraw.com/#json=R7V2wJIyEX_tR3frH6Y4s,uUzu0qKuoJ3BfcoVdsSkMA)

<!-- ### Slides -->

<!-- [Link](www.your-slides-url-here.com) -->

## Deploy

[Link](https://malejaroti.github.io/ShutterDive-web-game/)
