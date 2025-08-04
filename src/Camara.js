class Camara {
  constructor(x, y, w, h) {
    this.node = document.createElement(`div`);
    this.node.className = `camara`;
    gameBoxNode.append(this.node);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;

    // Adjust initial position
    this.node.style.position = "relative";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    this.node.style.border = "2px black solid";
    this.node.style.display = `none`;
  }
}
