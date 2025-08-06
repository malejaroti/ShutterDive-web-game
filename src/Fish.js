class Fish extends Element {
  constructor(randomFish, x = gameBoxNode.offsetWidth, y = 60) {
    super(x, y, randomFish.w, randomFish.h);
    this.fishType = randomFish.fishName;
    // this.node.style.border = "1px black solid";

    this.swimmingSpeed = 2;
    this.node.src = randomFish.src;
  }

  fishSwim() {
    super.swimHorizontally("Left");
  }
}
