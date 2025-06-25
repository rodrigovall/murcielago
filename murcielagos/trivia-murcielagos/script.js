const preguntas = [
  {
    texto: "¿Cuántas especies de murciélagos existen en el mundo?",
    opciones: ["50", "1300", "5000"],
    correcta: 1,
    curiosidad: "Existen más de 1.300 especies de murciélagos en todo el mundo.",
    explicacion: "La opción correcta era 1300: los murciélagos son el segundo orden más diverso de mamíferos.",
    imagen: "/img/murcielago1.png"
  },
  {
    texto: "¿Qué usan los murciélagos para orientarse en la oscuridad?",
    opciones: ["La vista", "Ecolocación", "El olfato"],
    correcta: 1,
    curiosidad: "La ecolocación les permite detectar insectos incluso en la oscuridad total.",
    explicacion: "Usan ecolocación: emiten sonidos que rebotan en los objetos para \"ver\" con el oído.",
    imagen: "/img/murcielago2.png"
  },
  {
    texto: "¿Qué comen la mayoría de los murciélagos?",
    opciones: ["Sangre", "Frutas", "Insectos"],
    correcta: 2,
    curiosidad: "La mayoría de los murciélagos se alimentan de insectos, ayudando a controlar plagas.",
    explicacion: "Aunque algunos comen frutas o sangre, la mayoría come insectos.",
    imagen: "/img/murcielago3.png"
  },
  {
  texto: "¿Cuál es el único mamífero que puede volar activamente?",
  opciones: ["El murciélago", "La ardilla voladora", "La zarigüeya"],
  correcta: 0,
  curiosidad: "Los murciélagos son los únicos mamíferos capaces de vuelo activo sostenido.",
  explicacion: "Aunque la ardilla voladora planea, solo los murciélagos pueden volar batiendo sus alas.",
  imagen: "/img/murcielago4.png"
},
{
  texto: "¿Qué parte del cuerpo usan los murciélagos para volar?",
  opciones: ["Sus patas", "Sus orejas", "Sus manos"],
  correcta: 2,
  curiosidad: "Las alas de los murciélagos son en realidad manos adaptadas, con dedos largos unidos por una membrana.",
  explicacion: "A diferencia de las aves, los murciélagos vuelan usando una estructura similar a una mano.",
  imagen: "/img/murcielago5.jpg"
},
{
  texto: "¿Dónde descansan los murciélagos durante el día?",
  opciones: ["En el suelo", "En cuevas y árboles", "En nidos"],
  correcta: 1,
  curiosidad: "Los murciélagos descansan colgados boca abajo en cuevas, árboles huecos y otros refugios oscuros.",
  explicacion: "Durante el día, se esconden en lugares oscuros y tranquilos porque son animales nocturnos.",
  imagen: "/img/murcielago6.png"
},
{
  texto: "¿Qué función ecológica cumplen muchos murciélagos?",
  opciones: ["Causan enfermedades", "Polinizan plantas y controlan plagas", "Cazan a otros murciélagos"],
  correcta: 1,
  curiosidad: "Muchos murciélagos son polinizadores y controlan insectos que dañan cultivos.",
  explicacion: "Son aliados del ambiente: comen insectos y ayudan a muchas plantas a reproducirse.",
  imagen: "/img/murcielago7.png"
},
{
  texto: "¿Cómo se llaman los murciélagos que se alimentan de sangre?",
  opciones: ["Vampiros", "Zorros voladores", "Nectarívoros"],
  correcta: 0,
  curiosidad: "Existen solo 3 especies de murciélagos vampiros, y viven en América Latina.",
  explicacion: "Aunque famosos por las películas, muy pocos murciélagos se alimentan de sangre.",
  imagen: "/img/murcielago8.png"
}

];

let indice = 0;

function mostrarPregunta() {
  const p = preguntas[indice];
  document.getElementById("pregunta").innerText = p.texto;
  document.getElementById("imagen").src = p.imagen;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";

  p.opciones.forEach((opcion, i) => {
    const boton = document.createElement("button");
    boton.innerText = opcion;
    boton.onclick = () => verificarRespuesta(i);
    opcionesDiv.appendChild(boton);
  });
}

function verificarRespuesta(seleccionada) {
  const p = preguntas[indice];
  const resultado = document.getElementById("respuesta");
  const sonidoCorrecto = document.getElementById("sonido-correcto");
  const sonidoIncorrecto = document.getElementById("sonido-incorrecto");

  if (seleccionada === p.correcta) {
    sonidoCorrecto.play();
    resultado.innerText = "✅ ¡Correcto! " + p.curiosidad;
  } else {
    sonidoIncorrecto.play();
    resultado.innerText = "❌ Incorrecto. " + p.explicacion;
  }

  indice++;
  if (indice < preguntas.length) {
    setTimeout(() => {
      resultado.innerText = "";
      mostrarPregunta();
    }, 3000);
  } else {
    setTimeout(() => {
      document.getElementById("pregunta").innerText = "¡Gracias por jugar!";
      document.getElementById("opciones").innerHTML = "";
      document.getElementById("imagen").style.display = "none";
    }, 4000);
  }
}

mostrarPregunta();
