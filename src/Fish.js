class Fish extends Element {
  constructor(x = 400, y = 60) {
    const w = 80;
    const h = 50;
    super(x, y, w, h);
    this.w = w;
    this.h = h;
    this.node.src = `./images/Fish-YellowTang.png`;
    this.node.style.transform = "scaleX(-1)";
    this.swimmingSpeed = 2;
  }

  fishSwim() {
    super.swimHorizontally("Left");
  }
}
