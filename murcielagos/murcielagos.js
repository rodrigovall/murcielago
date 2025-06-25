const canvas = document.getElementById("murcielagosCanvas");
const ctx = canvas.getContext("2d");
const contadorDiv = document.getElementById("contadorMurcielagos");

let murcielagos = [];
let atrapados = 0;
let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

class Murcielago {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = 20 + Math.random() * 20;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3;
  }

  draw() {
    ctx.font = `${this.size}px serif`;
    ctx.fillStyle = "black";
    ctx.fillText("🦇", this.x, this.y);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  fueAtrapado(clickX, clickY) {
    const distancia = Math.hypot(clickX - this.x, clickY - this.y);
    return distancia < this.size;
  }
}

function crearMurcielagos(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    murcielagos.push(new Murcielago());
  }
}

function animar() {
  ctx.clearRect(0, 0, width, height);
  murcielagos.forEach(m => {
    m.update();
    m.draw();
  });
  requestAnimationFrame(animar);
}

canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  for (let i = 0; i < murcielagos.length; i++) {
    if (murcielagos[i].fueAtrapado(clickX, clickY)) {
      murcielagos.splice(i, 1); // eliminar murciélago atrapado
      atrapados++;
      contadorDiv.innerText = `Murciélagos atrapados: ${atrapados}`;
      break;
    }
  }
});

crearMurcielagos(10);
animar();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});
