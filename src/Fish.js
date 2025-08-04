class Fish extends Element {
  constructor(fishType, x = gameBoxNode.offsetWidth, y = 60, w, h) {
    super(x, y, w, h);
    this.fishType = fishType;

    this.swimmingSpeed = 1;

    switch (fishType) {
      case "Yellow-tang":
        this.node.src = `./images/Fish-YellowTang.png`;
        this.node.style.transform = "scaleX(-1)";
        break;
      case "Blue-tang":
        this.node.src = `./images/Fish-BlueTang.png`;
        break;
      case "Parrotfish":
        this.node.src = `./images/Fish-Parrotfish.png`;
        this.node.style.transform = "scaleX(-1)";
        break;
      case "Greenturtle":
        this.node.src = `./images/Greenturtle.png`;
        this.node.style.transform = "scaleX(-1)";
        break;
      default:
        break;
    }
  }

  fishSwim() {
    super.swimHorizontally("Left");
  }
}
