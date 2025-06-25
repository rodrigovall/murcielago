const canvasFondo = document.getElementById("fondoEstrellas");
const ctxFondo = canvasFondo.getContext("2d");

const canvasJuego = document.getElementById("murcielagosCanvas");
const ctx = canvasJuego.getContext("2d");

function ajustarCanvas() {
  canvasFondo.width = canvasJuego.width = window.innerWidth;
  canvasFondo.height = canvasJuego.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// ⭐ Estrellas
const estrellas = Array.from({ length: 150 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5 + 0.5,
  d: Math.random() * 0.5 + 0.2
}));

function dibujarLuna() {
  ctxFondo.beginPath();
  ctxFondo.arc(window.innerWidth - 100, 100, 50, 0, Math.PI * 2);
  ctxFondo.fillStyle = "#f5f3ce";
  ctxFondo.fill();
}

// 🌳 Árboles (estilo silueta)
function dibujarArboles() {
  ctxFondo.fillStyle = "#0a0a0a";
  for (let i = 0; i < window.innerWidth; i += 50) {
    const altura = 50 + Math.random() * 80;
    ctxFondo.fillRect(i, window.innerHeight - altura, 30, altura);
  }
}

function animarFondo() {
  ctxFondo.clearRect(0, 0, canvasFondo.width, canvasFondo.height);

  // Fondo
  ctxFondo.fillStyle = "#0b0c10";
  ctxFondo.fillRect(0, 0, canvasFondo.width, canvasFondo.height);

  // Luna y árboles
  dibujarLuna();
  dibujarArboles();

  // Estrellas
  ctxFondo.fillStyle = "#fff";
  estrellas.forEach((estrella) => {
    ctxFondo.beginPath();
    ctxFondo.arc(estrella.x, estrella.y, estrella.r, 0, Math.PI * 2);
    ctxFondo.fill();
    estrella.y += estrella.d;
    if (estrella.y > canvasFondo.height) {
      estrella.y = 0;
      estrella.x = Math.random() * canvasFondo.width;
    }
  });

  requestAnimationFrame(animarFondo);
}
animarFondo();

// 🎮 Juego
const contador = document.getElementById("contadorMurcielagos");
const curiosidadBox = document.getElementById("curiosidad");
const reiniciarBtn = document.getElementById("reiniciarBtn");

let atrapados = 0;
let murcielagos = [];

const curiosidades = [
  "Los murciélagos son los únicos mamíferos que vuelan.",
  "Algunas especies comen frutas, otras insectos.",
  "Son esenciales para la polinización.",
  "Pueden vivir más de 30 años.",
  "Se orientan con ecolocalización.",
  "Hay más de 1.400 especies.",
  "Algunos vuelan a más de 100 km/h.",
  "Solo 3 especies se alimentan de sangre.",
  "Los murciélagos ayudan a controlar plagas.",
  "Son activos de noche: son nocturnos."
];

class Murcielago {
  constructor() {
    this.size = Math.random() * 20 + 25; // entre 25 y 45
    this.x = Math.random() * canvasJuego.width;
    this.y = Math.random() * canvasJuego.height;
    this.speedX = (Math.random() - 0.5) * 2; // más rápidos
    this.speedY = (Math.random() - 0.5) * 2;
  }

  draw() {
    ctx.font = `${this.size}px serif`;
    ctx.fillText("🦇", this.x, this.y);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvasJuego.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasJuego.height) this.speedY *= -1;
  }

  fueAtrapado(x, y) {
    return Math.hypot(x - this.x, y - this.y) < this.size;
  }
}

function crearMurcielagos(n) {
  murcielagos = [];
  for (let i = 0; i < n; i++) {
    murcielagos.push(new Murcielago());
  }
}

function mostrarCuriosidad() {
  const frase = curiosidades[Math.floor(Math.random() * curiosidades.length)];
  curiosidadBox.innerText = frase;
  curiosidadBox.style.display = "block";
  setTimeout(() => {
    curiosidadBox.style.display = "none";
  }, 4000);
}

canvasJuego.addEventListener("click", (e) => {
  const rect = canvasJuego.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < murcielagos.length; i++) {
    if (murcielagos[i].fueAtrapado(x, y)) {
      murcielagos.splice(i, 1);
      atrapados++;
      contador.innerText = `Murciélagos atrapados: ${atrapados}`;
      mostrarCuriosidad();
      break;
    }
  }
});

function animarMurcielagos() {
  ctx.clearRect(0, 0, canvasJuego.width, canvasJuego.height);
  murcielagos.forEach((m) => {
    m.update();
    m.draw();
  });
  requestAnimationFrame(animarMurcielagos);
}

reiniciarBtn.addEventListener("click", () => {
  atrapados = 0;
  contador.innerText = "Murciélagos atrapados: 0";
  crearMurcielagos(10);
});

crearMurcielagos(10);
animarMurcielagos();
