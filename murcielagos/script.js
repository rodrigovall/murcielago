document.getElementById("formEncuesta").addEventListener("submit", function(e) {
  e.preventDefault();

  const respuestas = {};
  const estadisticas = {};

  for (let i = 1; i <= 10; i++) {
    const pregunta = document.querySelector(`input[name="p${i}"]:checked`);
    if (pregunta) {
      const valor = pregunta.value;
      respuestas[`p${i}`] = valor;

      // Contar en estadísticas
      if (!estadisticas[`p${i}`]) estadisticas[`p${i}`] = {};
      if (!estadisticas[`p${i}`][valor]) estadisticas[`p${i}`][valor] = 0;
      estadisticas[`p${i}`][valor]++;
    } else {
      alert(`Por favor respondé la pregunta ${i}`);
      return;
    }
  }

  // Mostrar resultados
  const contenedor = document.getElementById("estadisticas");
  contenedor.innerHTML = "<h3>Estadísticas de tus respuestas:</h3>";

  for (let i = 1; i <= 10; i++) {
    const val = respuestas[`p${i}`];
    contenedor.innerHTML += `<p><strong>Pregunta ${i}:</strong> Respuesta elegida: ${val}</p>`;
  }

  
});
