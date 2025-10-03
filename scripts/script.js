document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Iniciando TikTok Perú Academy JS...");
  
  // Trackear visita al sitio web
  trackSiteVisit();
  
  try {
    initThemeToggle();
    console.log("✅ Theme toggle iniciado");
  } catch (e) {
    console.error("❌ Error en theme toggle:", e);
  }
  
  try {
    initCountdownTimer();
    console.log("✅ Countdown timer iniciado");
  } catch (e) {
    console.error("❌ Error en countdown:", e);
  }
  
  try {
    initDashboardAnimations();
    console.log("✅ Dashboard animations iniciado");
  } catch (e) {
    console.error("❌ Error en dashboard:", e);
  }
  
  try {
    initFormValidation();
    console.log("✅ Form validation iniciado");
  } catch (e) {
    console.error("❌ Error en form validation:", e);
  }
  
  try {
    initSmoothScroll();
    console.log("✅ Smooth scroll iniciado");
  } catch (e) {
    console.error("❌ Error en smooth scroll:", e);
  }
  
  try {
    initMicroInteractions();
    console.log("✅ Micro interactions iniciado");
  } catch (e) {
    console.error("❌ Error en micro interactions:", e);
  }
  
  try {
    initPeruAnimations();
    console.log("✅ Peru animations iniciado");
  } catch (e) {
    console.error("❌ Error en Peru animations:", e);
  }
  
  try {
    initTestimonialAnimations();
    console.log("✅ Testimonial animations iniciado");
  } catch (e) {
    console.error("❌ Error en testimonial animations:", e);
  }
  
  try {
    initFAQEnhancements();
    console.log("✅ FAQ enhancements iniciado");
  } catch (e) {
    console.error("❌ Error en FAQ enhancements:", e);
  }
  
  try {
    initStatsCounter();
    console.log("✅ Stats counter iniciado");
  } catch (e) {
    console.error("❌ Error en stats counter:", e);
  }
  
  console.log("🎉 ¡Todos los scripts cargados exitosamente!");
});

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) {
    console.warn("⚠️ Elemento themeToggle no encontrado");
    return;
  }
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      showNotification("� Modo oscuro ON - Welcome to the dark side", "info");
    } else {
      showNotification("🌞 Modo claro ON - Back to reality", "info");
    }
  });
}

function initCountdownTimer() {
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!hoursEl || !minutesEl || !secondsEl) {
    console.warn("⚠️ Elementos del countdown no encontrados");
    return;
  }
  
  const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
  
  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = endTime - now;
    
    if (timeLeft > 0) {
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

function initDashboardAnimations() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('dashboard-peru')) {
          animatePeruStats();
          animateChart();
        }
      }
    });
  }, observerOptions);

  const dashboard = document.querySelector('.dashboard-peru');
  if (dashboard) {
    observer.observe(dashboard);
  }
}

function animatePeruStats() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const prefix = counter.getAttribute('data-prefix') || '';
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        const value = Math.floor(current);
        counter.textContent = prefix + value.toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + target.toLocaleString();
      }
    };

    setTimeout(updateCounter, Math.random() * 500);
  });
}

function animateChart() {
  const chartPath = document.querySelector('.growth-path');
  const chartArea = document.querySelector('.growth-area');
  
  if (chartPath) {
    chartPath.style.animation = 'drawPath 3s ease-out forwards';
  }
  
  if (chartArea) {
    setTimeout(() => {
      chartArea.style.animation = 'fillArea 2s ease-out forwards';
    }, 1000);
  }
}

function initFormValidation() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const curso = document.getElementById("curso").value;
    const telefono = document.getElementById("telefono").value.trim();

    if (nombre === "" || email === "" || curso === "" || telefono === "") {
      showNotification("🙄 Bruh, fill all the fields first", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("😅 That email looks sus, try again", "error");
      return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phoneRegex.test(telefono)) {
      showNotification("📱 Phone number said 'nah bro'", "error");
      return;
    }

    const datosFormulario = {
      nombre,
      email,
      curso,
      telefono,
      fecha: new Date().toLocaleString(),
      pais: "Perú"
    };

    let inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
    inscripciones.push(datosFormulario);
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    showNotification("😎 You're in! Check your DMs in 24h", "success");
    
    form.style.transition = 'all 0.5s ease';
    form.style.transform = 'scale(0.95)';
    form.style.opacity = '0.7';
    
    setTimeout(() => {
      form.reset();
      form.style.transform = 'scale(1)';
      form.style.opacity = '1';
    }, 1000);
  });
}

function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        targetSection.style.transition = 'all 0.3s ease';
        targetSection.style.background = 'rgba(220, 38, 38, 0.05)';
        
        setTimeout(() => {
          targetSection.style.background = '';
        }, 1500);
      }
    });
  });
}

function initMicroInteractions() {
  const cards = document.querySelectorAll('.story-card, .stat-card, .course-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = card.classList.contains('story-card') 
        ? 'translateY(-8px) rotate(1deg) scale(1.02)' 
        : 'translateY(-5px) scale(1.02)';
      
      const icon = card.querySelector('.stat-icon, .course-icon');
      if (icon) {
        icon.style.transform = 'rotate(5deg) scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotate(0deg) scale(1)';
      
      const icon = card.querySelector('.stat-icon, .course-icon');
      if (icon) {
        icon.style.transform = 'rotate(0deg) scale(1)';
      }
    });
  });

  const regionDots = document.querySelectorAll('.region-dot');
  regionDots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      dot.style.animation = 'none';
      dot.style.transform = 'scale(1.5)';
      dot.style.background = '#f59e0b';
    });
    
    dot.addEventListener('mouseleave', () => {
      dot.style.animation = '';
      dot.style.transform = 'scale(1)';
      dot.style.background = '#f59e0b';
    });
  });
}

function initPeruAnimations() {
  const peruElements = document.querySelectorAll('.peru-flag-accent, .badge-flag');
  
  peruElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animation = 'flagWave 0.5s ease-in-out';
    });
  });

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-peru');
    
    if (hero && scrolled < hero.offsetHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

function playTestimonial() {
  const thumbnail = document.querySelector('.video-thumbnail');
  const messages = [
    "🎬 Coming soon! Real testimonials (no cap)",
    "📹 Video loading... Just kidding, it's coming",
    "🎥 Testimonials are in the works, stay tuned!"
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  showNotification(randomMessage, "info");
  
  thumbnail.style.transform = 'scale(0.95)';
  setTimeout(() => {
    thumbnail.style.transform = 'scale(1)';
  }, 200);
}

function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" aria-label="Cerrar notificación">&times;</button>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

const konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    showNotification("🔥 Konami code activated! You're a legend �", "success");
    
    document.body.style.animation = 'rainbow 3s linear';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 3000);
    
    konamiCode.length = 0;
  }
});

const dynamicStyles = `
  <style>
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 320px;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
    }
    
    .notification-success {
      background: linear-gradient(135deg, #dc2626, #f59e0b);
    }
    
    .notification-error {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    
    .notification-info {
      background: linear-gradient(135deg, #1e40af, #3b82f6);
    }
    
    .notification button {
      background: none;
      border: none;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
    
    .notification button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      25% { filter: hue-rotate(90deg); }
      50% { filter: hue-rotate(180deg); }
      75% { filter: hue-rotate(270deg); }
      100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes flagWave {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-2deg) scale(1.05); }
      75% { transform: rotate(2deg) scale(1.05); }
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);

// Animaciones para testimonios
function initTestimonialAnimations() {
  const testimonialCards = document.querySelectorAll('.testimonio-card');
  
  if (testimonialCards.length === 0) {
    console.warn("⚠️ No se encontraron tarjetas de testimonios");
    return;
  }
  
  console.log(`📝 Encontradas ${testimonialCards.length} tarjetas de testimonios`);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
      }
    });
  }, { threshold: 0.1 });
  
  testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
  
  // Efecto hover para avatares
  const avatars = document.querySelectorAll('.avatar img');
  console.log(`👤 Encontrados ${avatars.length} avatares`);
  
  avatars.forEach(avatar => {
    avatar.addEventListener('mouseenter', () => {
      avatar.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Mejoras para FAQ
function initFAQEnhancements() {
  const faqItems = document.querySelectorAll('.faq-item details');
  
  if (faqItems.length === 0) {
    console.warn("⚠️ No se encontraron elementos FAQ");
    return;
  }
  
  console.log(`❓ Encontrados ${faqItems.length} elementos FAQ`);
  
  faqItems.forEach((item, index) => {
    const summary = item.querySelector('summary');
    
    // Animación de entrada escalonada
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 100);
    
    // Efecto al abrir/cerrar
    item.addEventListener('toggle', () => {
      if (item.open) {
        summary.style.background = 'rgba(220, 38, 38, 0.1)';
        item.style.borderLeft = '4px solid var(--primary)';
        
        // Cerrar otros FAQ de la misma categoría
        const category = item.closest('.faq-category');
        if (category) {
          const otherItems = category.querySelectorAll('details');
          otherItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.open) {
              otherItem.open = false;
            }
          });
        }
      } else {
        summary.style.background = '';
        item.style.borderLeft = '';
      }
    });
  });
  
  // Inicializar estilos
  faqItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.4s ease-out';
  });
}

// Contador animado para estadísticas
function initStatsCounter() {
  const stats = document.querySelectorAll('.testimonios-stats .stat-number');
  
  if (stats.length === 0) {
    console.warn("⚠️ No se encontraron estadísticas para animar");
    return;
  }
  
  console.log(`📊 Encontradas ${stats.length} estadísticas para animar`);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        animateCounter(target, finalValue);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, finalValue) {
  const isPercentage = finalValue.includes('%');
  const isCurrency = finalValue.includes('S/');
  const isDecimal = finalValue.includes('.');
  
  let numericValue;
  
  if (isCurrency) {
    numericValue = parseFloat(finalValue.replace('S/', '').replace('M', '')) * (finalValue.includes('M') ? 1000000 : 1);
  } else if (isPercentage) {
    numericValue = parseInt(finalValue.replace('%', ''));
  } else if (isDecimal) {
    numericValue = parseFloat(finalValue.replace(',', ''));
  } else {
    numericValue = parseInt(finalValue.replace(',', '').replace('.', ''));
  }
  
  const duration = 2000;
  const stepTime = 50;
  const steps = duration / stepTime;
  const increment = numericValue / steps;
  
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }
    
    let displayValue;
    if (isCurrency) {
      if (finalValue.includes('M')) {
        displayValue = `S/${(current / 1000000).toFixed(1)}M`;
      } else {
        displayValue = `S/${Math.round(current).toLocaleString()}`;
      }
    } else if (isPercentage) {
      displayValue = `${Math.round(current)}%`;
    } else if (isDecimal) {
      displayValue = current.toFixed(3).replace('.', ',');
    } else {
      if (current >= 1000) {
        displayValue = Math.round(current).toLocaleString();
      } else {
        displayValue = Math.round(current).toString();
      }
    }
    
    element.textContent = displayValue;
  }, stepTime);
}

// ===== TRACKING DE VISITAS =====
function trackSiteVisit() {
  // Obtener visitas actuales
  let totalVisits = localStorage.getItem('totalSiteVisits') || '0';
  totalVisits = parseInt(totalVisits);
  
  // Verificar si es una nueva sesión (no contar recargas)
  const lastVisit = sessionStorage.getItem('lastVisitTime');
  const currentTime = new Date().getTime();
  
  if (!lastVisit || (currentTime - parseInt(lastVisit)) > 30000) { // 30 segundos entre visitas
    totalVisits += 1;
    localStorage.setItem('totalSiteVisits', totalVisits.toString());
    sessionStorage.setItem('lastVisitTime', currentTime.toString());
    
    console.log(`🎯 Nueva visita registrada. Total: ${totalVisits}`);
    
    // Registrar información adicional de la visita
    const visitData = {
      timestamp: currentTime,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct'
    };
    
    // Guardar últimas 10 visitas para analytics
    let recentVisits = JSON.parse(localStorage.getItem('recentVisits') || '[]');
    recentVisits.unshift(visitData);
    recentVisits = recentVisits.slice(0, 10); // Mantener solo las últimas 10
    localStorage.setItem('recentVisits', JSON.stringify(recentVisits));
  }
}
