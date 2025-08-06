class Fish extends Element {
  constructor(randomFish, x = gameBoxNode.offsetWidth, y = 60) {
    super(x, y, randomFish.w, randomFish.h);
    this.fishType = randomFish.fishName;
    this.node.style.border = "1px black solid";

    this.swimmingSpeed = 2;
    this.node.src = randomFish.src;
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
    src: `./images/Greenturtle.png`,
    w: 100,
    h: 70,
  },
  {
    fishName: "Grey-Angelfish",
    src: `./images/Fish-grey-angelfish-t.png`,
    w: 95,
    h: 95,
  },
  {
    fishName: "Flying-gurnard",
    src: `./images/Fish-flying-gurnard.png`,
    w: 100,
    h: 80,
  },
];
