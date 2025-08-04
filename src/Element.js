class Element {
  constructor(x, y, w, h) {
    this.node = document.createElement(`img`);
    gameBoxNode.append(this.node);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;

    // Adjust initial position
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    // this.node.style.top = `${this.y}%`;
  }
  swimHorizontally(direction) {
    if (direction === "Right") {
      this.x += this.swimmingSpeed;
    } else if (direction === "Left") {
      this.x -= this.swimmingSpeed;
    }
    this.node.style.left = `${this.x}px`;
  }
}
