class Diver extends Element {
  constructor(x = 30, y = 30) {
    const w = 200;
    const h = 200;
    super(x, y, w, h);
    this.w = w;
    this.h = h;
    this.node.src = `./images/Diver.png`;

    this.swimmingSpeed = 20;
    this.swimmingDirection = "Right";
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
    if (this.swimmingDirection === "Right") {
      if (keyEvent === "ArrowLeft") {
        this.changeSwimDirection();
        super.swimHorizontally("Left");
      } else if (keyEvent === "ArrowRight") {
        super.swimHorizontally("Right");
      }
    }

    if (this.swimmingDirection === "Left") {
      if (keyEvent === "ArrowRight") {
        this.changeSwimDirection();
        super.swimHorizontally("Right");
      } else if (keyEvent === "ArrowLeft") {
        super.swimHorizontally("Left");
      }
    }
  }

  swimVertically(keyEvent) {
    if (keyEvent === "ArrowUp") {
      this.y -= this.swimmingSpeed;
    } else if (keyEvent === "ArrowDown") {
      this.y += this.swimmingSpeed;
    }
    this.node.style.top = `${this.y}px`;
  }
}
