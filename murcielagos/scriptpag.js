const canvasDecorativo = document.getElementById("murcielagosDecorativos");
const ctxDecorativo = canvasDecorativo.getContext("2d");

function ajustarCanvasDecorativo() {
  canvasDecorativo.width = window.innerWidth;
  canvasDecorativo.height = window.innerHeight;
}
ajustarCanvasDecorativo();
window.addEventListener("resize", ajustarCanvasDecorativo);

class MurcielagoDecorativo {
  constructor() {
    this.size = Math.random() * 15 + 20;
    this.x = Math.random() * canvasDecorativo.width;
    this.y = Math.random() * canvasDecorativo.height;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  draw() {
    ctxDecorativo.save();
    ctxDecorativo.translate(this.x, this.y);
    ctxDecorativo.rotate(this.angle);
    ctxDecorativo.font = `${this.size}px serif`;
    ctxDecorativo.fillText("🦇", 0, 0);
    ctxDecorativo.restore();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.rotationSpeed;

    if (this.x < -50) this.x = canvasDecorativo.width + 50;
    if (this.x > canvasDecorativo.width + 50) this.x = -50;
    if (this.y < -50) this.y = canvasDecorativo.height + 50;
    if (this.y > canvasDecorativo.height + 50) this.y = -50;
  }
}

const murcielagosDecorativos = [];
for (let i = 0; i < 15; i++) {
  murcielagosDecorativos.push(new MurcielagoDecorativo());
}

function animarDecorativo() {
  ctxDecorativo.clearRect(0, 0, canvasDecorativo.width, canvasDecorativo.height);
  murcielagosDecorativos.forEach((m) => {
    m.update();
    m.draw();
  });
  requestAnimationFrame(animarDecorativo);
}
animarDecorativo();
