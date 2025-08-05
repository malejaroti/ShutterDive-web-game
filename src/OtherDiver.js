class OtherDiver extends Element {
  constructor(y) {
    const x = gameBoxNode.offsetWidth;
    const w = 110;
    const h = 80;
    super(x, y, w, h);
    this.node.src = `./images/OtherDiver.png`;
    // this.node.style.border = "1px black solid";

    this.swimmingSpeed = 5;
  }
}
