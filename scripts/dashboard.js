// ===== DASHBOARD JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard cargado exitosamente');
    
    // Verificar autenticación
    checkAuthentication();
    
    // Inicializar funciones
    initDateTime();
    initThemeToggle();
    initSidebar();
    initVisitsCounter();
    initChart();
    
    // Actualizar datos cada 30 segundos
    setInterval(() => {
        updateDateTime();
        updateVisitsCount();
        updateActivity();
    }, 30000);
});

// ===== AUTENTICACIÓN =====
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (!isLoggedIn || currentUser !== 'dashboard') {
        window.location.href = '../hmtl/login.html';
        return;
    }
    
    console.log('✅ Usuario autenticado como dashboard admin');
}

// ===== FECHA Y HORA =====
function initDateTime() {
    updateDateTime();
}

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('es-PE', options);
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// ===== TOGGLE TEMA =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        showNotification(
            newTheme === 'dark' 
                ? '🌚 Dashboard mode: DARK activated' 
                : '🌞 Dashboard mode: LIGHT activated', 
            'info'
        );
    });
}

// ===== SIDEBAR =====
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Cerrar sidebar al hacer click fuera en mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ===== CONTADOR DE VISITAS =====
function initVisitsCounter() {
    updateVisitsCount();
    trackPageVisit();
}

function updateVisitsCount() {
    let totalVisits = localStorage.getItem('totalSiteVisits') || '0';
    totalVisits = parseInt(totalVisits);
    
    // Formatear número con comas
    const formattedVisits = totalVisits.toLocaleString('es-PE');
    document.getElementById('totalVisits').textContent = formattedVisits;
    
    console.log(`📊 Total visitas: ${formattedVisits}`);
}

function trackPageVisit() {
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
        
        // Actualizar en tiempo real
        updateVisitsCount();
        
        console.log('🎯 Nueva visita registrada');
    }
}

function addTestVisit() {
    let totalVisits = localStorage.getItem('totalSiteVisits') || '0';
    totalVisits = parseInt(totalVisits) + 1;
    localStorage.setItem('totalSiteVisits', totalVisits.toString());
    
    updateVisitsCount();
    updateChart();
    
    showNotification('📈 Visita de prueba añadida correctamente', 'success');
    
    // Añadir actividad reciente
    addRecentActivity('visit', 'Nueva visita simulada desde el dashboard', 'Ahora');
}

// ===== GRÁFICO DE VISITAS =====
function initChart() {
    const canvas = document.getElementById('visitsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Datos de ejemplo para los últimos 7 días
    const visitsData = getLastWeekVisits();
    
    drawChart(ctx, visitsData);
}

function getLastWeekVisits() {
    // Generar datos de ejemplo basados en las visitas totales
    const totalVisits = parseInt(localStorage.getItem('totalSiteVisits') || '0');
    const baseVisits = Math.max(10, Math.floor(totalVisits / 7));
    
    return [
        baseVisits + Math.floor(Math.random() * 20),
        baseVisits + Math.floor(Math.random() * 25),
        baseVisits + Math.floor(Math.random() * 18),
        baseVisits + Math.floor(Math.random() * 30),
        baseVisits + Math.floor(Math.random() * 22),
        baseVisits + Math.floor(Math.random() * 28),
        baseVisits + Math.floor(Math.random() * 35)
    ];
}

function drawChart(ctx, data) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data) + 10;
    
    // Dibujar líneas de grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Dibujar línea de datos
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Dibujar puntos
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#8b5cf6';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Labels de días
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    days.forEach((day, index) => {
        const x = padding + (chartWidth / (days.length - 1)) * index;
        ctx.fillText(day, x, height - 10);
    });
}

function updateChart() {
    const canvas = document.getElementById('visitsChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const newData = getLastWeekVisits();
        drawChart(ctx, newData);
    }
}

// ===== ACTIVIDAD RECIENTE =====
function updateActivity() {
    // Simular nueva actividad ocasionalmente
    if (Math.random() < 0.3) {
        const activities = [
            { type: 'visit', text: 'Nueva visita desde Lima, Perú', time: 'Hace 2 minutos' },
            { type: 'visit', text: 'Nueva visita desde Arequipa, Perú', time: 'Hace 5 minutos' },
            { type: 'new-user', text: 'Carlos López se registró al curso', time: 'Hace 8 minutos' },
            { type: 'visit', text: 'Nueva visita desde Cusco, Perú', time: 'Hace 12 minutos' }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        addRecentActivity(randomActivity.type, randomActivity.text, randomActivity.time);
    }
}

function addRecentActivity(type, text, time) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // Crear nuevo elemento
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateY(-10px)';
    
    const iconClass = type === 'visit' ? 'visit' : type === 'new-user' ? 'new-user' : 'purchase';
    const iconName = type === 'visit' ? 'bx-show' : type === 'new-user' ? 'bx-user-plus' : 'bx-shopping-bag';
    
    activityItem.innerHTML = `
        <div class=\"activity-icon ${iconClass}\">
            <i class='bx ${iconName}'></i>
        </div>
        <div class=\"activity-content\">
            <p>${text}</p>
            <span class=\"activity-time\">${time}</span>
        </div>
    `;
    
    // Insertar al principio
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Animar entrada
    setTimeout(() => {
        activityItem.style.transition = 'all 0.3s ease';
        activityItem.style.opacity = '1';
        activityItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Limitar a 5 elementos
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick=\"this.parentElement.remove()\" aria-label=\"Cerrar notificación\">&times;</button>
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

// ===== FUNCIONES GLOBALES =====
window.addTestVisit = addTestVisit;

// ===== REFRESH CHART =====
document.addEventListener('click', (e) => {
    if (e.target.closest('#refreshChart')) {
        updateChart();
        showNotification('📊 Gráfico actualizado correctamente', 'success');
    }
});

// ===== INICIALIZAR TRACKING GLOBAL =====
function initGlobalTracking() {
    // Esta función se puede llamar desde main.html para trackear visitas
    trackPageVisit();
}

// Exportar para uso global
window.initGlobalTracking = initGlobalTracking;