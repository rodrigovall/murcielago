const piezas = Array.from({ length: 9 }, (_, i) => i);
const puzzle = document.getElementById("puzzle");
const mensaje = document.getElementById("mensaje");

let ordenCorrecto = [...piezas];
let ordenActual = [...piezas].sort(() => Math.random() - 0.5);

ordenActual.forEach((pos) => {
  const div = document.createElement("div");
  div.classList.add("pieza");
  div.draggable = true;

  const col = pos % 3;
  const fila = Math.floor(pos / 3);

  const x = col * 50;
  const y = fila * 50;

  div.style.backgroundPosition = `${x}% ${y}%`;
  div.dataset.index = pos;

  puzzle.appendChild(div);
});

let arrastrando;

puzzle.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("pieza")) {
    arrastrando = e.target;
  }
});

puzzle.addEventListener("dragover", (e) => {
  e.preventDefault();
});

puzzle.addEventListener("drop", (e) => {
  if (e.target.classList.contains("pieza") && arrastrando !== e.target) {
    const from = Array.from(puzzle.children).indexOf(arrastrando);
    const to = Array.from(puzzle.children).indexOf(e.target);

    puzzle.insertBefore(arrastrando, puzzle.children[to]);
    puzzle.insertBefore(e.target, puzzle.children[from]);

    verificar();
  }
});

function verificar() {
  const actuales = Array.from(puzzle.children).map(
    (div) => parseInt(div.dataset.index)
  );
  if (actuales.join() === ordenCorrecto.join()) {
    mensaje.innerText =
      "¡Correcto! ¿Sabías que los murciélagos pueden comer hasta 1,000 insectos en una hora?";
  } else {
    mensaje.innerText = "";
  }
}
