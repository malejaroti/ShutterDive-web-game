# ShutterDive

### _Uncover the Ocean’s Secrets — One Shot at a Time_

## [Play the Game!](https://malejaroti.github.io/ShutterDive-web-game/)

<img src="/images/Diver.png" width="300" height="300" />

# Description

Shutter Dive is an **underwater photography game** where you control a diver, take pictures of marine life, and aim for perfect shots to earn extra points!

The game ends when your dive time runs out due to low air supply.

It’s an educational game — by playing, users can discover the incredible variety of sea life that inhabits our oceans.

🌊 The game currently features 13 different marine species, including fish, squids, turtles, and more!

# Main Functionalities

- Move the diver with arrow keys
- Show camera focus with `Z`
- Take pictures with `X`
- Air timer and extra air from other divers
- Ranking system with local storage
- Customizable theme: Night or Day dive
- Dive log

- 📸 Scoring System  
  In Shutter Dive, players earn points by photographing marine animals. The scoring system rewards both presence and precision:

  - ✅ Base Score
    You get 500 points for any photo that contains an animal.

  - 🌟 Perfect Picture Bonus - You earn extra points when you take a perfect shot — this means the animal is fully visible and centered within the camera focus box. - The bonus depends on how difficult it is to perfectly frame the animal, based on its size relative to the camera box.

# Backlog Functionalities

- Different game modes, e.g. :
  - "The collector": Goal is to photograph all species
  - "The identifier" Type the name of the animal you photographed
- More fish species
- Moving background

# Technologies used

- HTML, CSS, Javascript, DOM Manipulation, JS Audio, Local Storage.

# States

- Start screen
- Game screen
- Game over / Dive log screen

# Proyect Structure

- **main.js**: Handles DOM, game logic, event listeners
- **Element.js**: Base class for element positioning and swimming movement.
- **Diver.js**: Diver logic
- **OtherDiver.js**: Other diver logic
- **Fish.js**: Fish logic
- **Camara.js**: Camera logic

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

### Slides -->

[Link](https://docs.google.com/presentation/d/1BZg6bPMrg5hh4CytLolTkWKgtuHJFvV_ehZkaEySJyA/edit?usp=sharing)

## Deploy

[Link](https://malejaroti.github.io/ShutterDive-web-game/)
