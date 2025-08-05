class Fish extends Element {
  constructor(fishType, x = gameBoxNode.offsetWidth, y = 60, w, h) {
    super(x, y, w, h);
    this.fishType = fishType;
    // this.node.style.border = "1px black solid";

    this.swimmingSpeed = 1;

    switch (fishType) {
      case "Yellow-tang":
        this.node.src = `./images/Fish-YellowTang.png`;
        break;
      case "Blue-tang":
        this.node.src = `./images/Fish-BlueTang.png`;
        break;
      case "Parrotfish":
        this.node.src = `./images/Fish-Parrotfish.png`;
        break;
      case "Greenturtle":
        this.node.src = `./images/Greenturtle.png`;
        break;
      case "Grey-Angelfish":
        this.node.src = `./images/Fish-grey-angelfish-t.png`;
        break;
      case "Flying-gurnard":
        this.node.src = `./images/Fish-flying-gurnard.png`;
        break;
      default:
        break;
    }
  }

  fishSwim() {
    super.swimHorizontally("Left");
  }
}
