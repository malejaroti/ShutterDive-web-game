class Camara {
  constructor(x, y, w, h) {
    this.node = document.createElement(`div`);
    this.pictureQualityNode = document.createElement(`div`);
    this.pictureQualityNode.className = `camara-quality-box`;
    this.node.className = `camara`;
    gameBoxNode.append(this.node);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.area = this.w * this.h;
    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;

    // Adjust initial position
    this.node.style.position = "relative";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

    this.node.style.border = "2px black solid";
    this.node.style.display = `none`;

    //Dimensions quality box
    // let qBox_width = 50;
    let qBox_height = 20;
    let qBox_x = "60%";
    let qBox_y = "-24px";

    this.pictureQualityNode.style.height = `${qBox_height}px`;
    // this.pictureQualityNode.style.width = `${qBox_width}px`;

    // Adjust initial position qualityBox
    this.pictureQualityNode.style.display = "none";
    this.pictureQualityNode.style.position = "absolute";
    this.pictureQualityNode.style.left = qBox_x;
    this.pictureQualityNode.style.top = qBox_y;
    this.pictureQualityNode.innerText = "Foto";

    this.node.append(this.pictureQualityNode);
  }
}
