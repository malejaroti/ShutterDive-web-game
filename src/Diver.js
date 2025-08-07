class Diver extends Element {
  constructor(x = 30, y = 30) {
    let w,
      h,
      src,
      diverSelected = "Diver1";
    switch (diverSelected) {
      case "Diver1":
        w = 150;
        h = 150;
        src = "./images/Diver.png";
        break;
      case "Diver2":
        w = 180;
        h = 90;
        src = "./images/Diver2.png";
        break;
      default:
        w = 150;
        h = 70;
        src = "./images/Diver.png";
        break;
    }
    super(x, y, w, h);
    this.w = w;
    this.h = h;
    this.node.src = src;
    this.swimmingSpeed = 18;
    this.swimmingDirection = "Right";
    this.speedBuoyancyEffect = 10;
    // this.node.style.border = "1px white solid";

    this.diverAgainstRightWall = false;
  }
  changeSwimDirection() {
    if (this.swimmingDirection === "Right") {
      this.node.style.transform = "scaleX(-1)";
      this.swimmingDirection = "Left";
    } else if (this.swimmingDirection === "Left") {
      this.node.style.transform = "scaleX(1)";
      this.swimmingDirection = "Right";
    }
  }

  swimHorizontally(keyEvent) {
    // console.log(keyEvent);
    if (diverObj.x + diverObj.w === gameBoxNode.offsetWidth) {
      this.diverAgainstRightWall = true;
    }

    if (this.swimmingDirection === "Right") {
      if (keyEvent === "ArrowLeft") {
        this.changeSwimDirection();
        super.swimHorizontally("Left");
      } else if (keyEvent === "ArrowRight" && diverObj.x + diverObj.w !== gameBoxNode.offsetWidth) {
        super.swimHorizontally("Right");
      }
    }

    if (this.swimmingDirection === "Left") {
      if (keyEvent === "ArrowRight") {
        this.changeSwimDirection();
        super.swimHorizontally("Right");
      } else if (keyEvent === "ArrowLeft" && this.x > 0) {
        super.swimHorizontally("Left");
      }
    }
  }
  swimVertically(keyEvent) {
    if (keyEvent === "ArrowUp" && this.y > 0) {
      this.y -= this.swimmingSpeed;
    } else if (keyEvent === "ArrowDown") {
      //Prevent to swim beyond sea bottom
      if (diverObj.y + diverObj.h > gameBoxNode.offsetHeight) {
        return;
      }
      this.y += this.swimmingSpeed;
    }
    this.node.style.top = `${this.y}px`;
  }

  negativeBuoyancyEffect() {
    this.y += this.speedBuoyancyEffect;
    this.node.style.top = `${this.y}px`;
    if (diverObj.y + diverObj.h > gameBoxNode.offsetHeight) {
      return;
    }
  }
  positiveBuoyancyEffect() {
    this.y -= this.speedBuoyancyEffect;
    this.node.style.top = `${this.y}px`;
  }
}
