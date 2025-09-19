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
<<<<<<< HEAD

// --- Navbar dinámico ---
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const title = header.querySelector("h1");
  const subtitle = header.querySelector("p");
  const targetSection = document.querySelector("#hero"); // id de tu sección "DominaTikTok en semanas"
  
  let lastScroll = 0;
  let isNavOnly = false;
  const tolerance = 5;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    const sectionTop = targetSection.getBoundingClientRect().top;

    // Scroll hacia abajo -> siempre nav reducido
    if (currentScroll - lastScroll > tolerance && currentScroll > 50) {
      if (!isNavOnly) {
        header.classList.add("nav-only");
        isNavOnly = true;
      }
    } 
    // Scroll hacia arriba -> solo header completo si llegas a la sección
    else if (lastScroll - currentScroll > tolerance) {
      if (sectionTop >= 0) {
        header.classList.remove("nav-only");
        isNavOnly = false;
      }
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
});


=======
>>>>>>> feature/formulario-contacto
