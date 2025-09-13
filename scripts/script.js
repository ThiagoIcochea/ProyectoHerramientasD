document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const curso = document.getElementById("curso").value;
    const mensaje = document.getElementById("mensaje").value.trim();

   
    if (nombre === "" || email === "" || curso === "") {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un email válido.");
      return;
    }

    
    const datosFormulario = {
      nombre,
      email,
      curso,
      mensaje,
      fecha: new Date().toLocaleString()
    };

    
    let inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
    inscripciones.push(datosFormulario);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

   
    alert("✅ Inscripción guardada correctamente en el navegador.");
    form.reset();
  });
});
