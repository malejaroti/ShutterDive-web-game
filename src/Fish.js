class Fish extends Element {
  constructor(randomFish, x = gameBoxNode.offsetWidth, y = 60) {
    super(x, y, randomFish.w, randomFish.h);
    this.fishType = randomFish.fishName;
    // this.node.style.border = "1px black solid";

    this.swimmingSpeed = 2;
    this.node.src = randomFish.src;
    this.scorePoints = randomFish["perfect-picture-score"];
  }

  fishSwim() {
    super.swimHorizontally("Left");
  }
}
const allFishNamesAndSizes = [
  {
    fishName: "Yellow-tang",
    src: `./images/Fish-YellowTang.png`,
    w: 50,
    h: 40,
  },
  {
    fishName: "Blue-tang",
    src: `./images/Fish-BlueTang.png`,
    w: 70,
    h: 50,
  },
  {
    fishName: "Parrotfish",
    src: `./images/Fish-Parrotfish.png`,
    w: 100,
    h: 50,
  },
  {
    fishName: "Greenturtle",
    src: `./images/Greenturtle.PNG`,
    w: 100,
    h: 70,
  },
  {
    fishName: "Grey-Angelfish",
    src: `./images/Fish-grey-angelfish-t.png`,
    w: 90,
    h: 90,
  },
  {
    fishName: "Flying-gurnard",
    src: `./images/Fish-flying-gurnard.png`,
    w: 100,
    h: 80,
  },
  // {
  //   fishName: "Honeycomb cowfish",
  //   src: `./images/Honeycomb-cowfish-2.png`,
  //   w: 100,
  //   h: 80,
  // },
  {
    fishName: "Honeycomb cowfish",
    src: `./images/Honeycomb-cowfish-1.png`,
    w: 90,
    h: 55,
  },
  {
    fishName: "Squid (caribbean)",
    src: `./images/Caribbean-squid-3-tentaclesRight.png`,
    w: 100,
    h: 80,
  },
  {
    fishName: "Yellow cowfish",
    src: `./images/Fish-yellow-cowfish.png`,
    w: 60,
    h: 50,
  },
  {
    fishName: "Spotted drum",
    src: `./images/Fish-spotted-drum.png`,
    w: 60,
    h: 50,
  },
  {
    fishName: "Squirrelfish",
    src: `./images/Squirrelfish.png`,
    w: 75,
    h: 50,
  },
  {
    fishName: "Hogfish",
    src: `./images/Hogfish.PNG`,
    w: 100,
    h: 70,
  },
  {
    fishName: "Spanish Hogfish",
    src: `./images/Spanish-hogfish.png`,
    w: 120,
    h: 65,
  },
];
