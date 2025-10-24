document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const rememberCheckbox = document.querySelector('input[type="checkbox"]');
    const loginBtn = document.querySelector('.btn');
    const forgotPasswordLink = document.querySelector('.remember-forgot a');
    const registerLink = document.querySelector('.register-link a');

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'
        });

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    async function fetchAdministradores() {
        try {
            const response = await fetch("https://tiktokperuacademy.com/ProyectoHerramientasD/backend/obtener_administradores.php");
            const data = await response.json();

            if (data.status === "success") {
                return data.data;
            } else {
                console.error("⚠️ No se encontraron administradores:", data.message);
                return [];
            }
        } catch (error) {
            console.error("❌ Error al conectar con el backend:", error);
            return [];
        }
    }

    async function handleLogin(email, password, remember) {
        const administradores = await fetchAdministradores();

        
        const user = administradores.find(u => u.email_admin === email);

        if (user) {
            if (password === user.password) {
                showNotification('✅ ¡Login exitoso! Redirigiendo...', 'success');

                if (remember) {
                    localStorage.setItem('rememberedUser', email);
                    localStorage.setItem('loginTime', new Date().getTime());
                }

                sessionStorage.setItem('currentUser', user.email_admin);
                sessionStorage.setItem('isLoggedIn', 'true');

                setTimeout(() => {
                    window.location.href = '../hmtl/dashboard.html';
                }, 1500);
                return true;
            } else {
                showNotification('❌ Contraseña incorrecta', 'error');
                return false;
            }
        } else {
            showNotification('⚠️ Usuario no encontrado', 'error');
            return false;
        }
    }

    function loadRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        const loginTime = localStorage.getItem('loginTime');
        
        if (rememberedUser && loginTime) {
            const daysSinceLogin = (new Date().getTime() - parseInt(loginTime)) / (1000 * 60 * 60 * 24);
            
            if (daysSinceLogin <= 30) {
                emailInput.value = rememberedUser;
                rememberCheckbox.checked = true;
                emailInput.parentElement.classList.add('focused');
                passwordInput.focus();
            } else {
                localStorage.removeItem('rememberedUser');
                localStorage.removeItem('loginTime');
            }
        }
    }

    function setupFormSubmission() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            loginBtn.style.transform = 'scale(0.95)';
            setTimeout(() => loginBtn.style.transform = 'scale(1)', 150);

            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const remember = rememberCheckbox.checked;
            
            if (!email || !password) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                emailInput.focus();
                return;
            }
            
            if (!validatePassword(password)) {
                showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
                passwordInput.focus();
                return;
            }

            loginBtn.disabled = true;
            loginBtn.textContent = 'Iniciando...';

            setTimeout(async () => {
                const success = await handleLogin(email, password, remember);
                if (!success) {
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Login';
                }
            }, 1000);
        });
    }

    function setupForgotPassword() {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = prompt('Ingresa tu email para recuperar la contraseña:');
            
            if (email && validateEmail(email)) {
                showNotification(`Se envió un enlace de recuperación a ${email}`, 'success');
            } else if (email) {
                showNotification('Por favor ingresa un email válido', 'error');
            }
        });
    }

    function setupRegisterLink() {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Función de registro próximamente disponible', 'info');
        });
    }

    function initializeLogin() {
        loadRememberedUser();
        setupFormSubmission();
        setupForgotPassword();
        setupRegisterLink();
        emailInput.focus();
        showNotification('Sistema de login cargado correctamente', 'success');
    }

    initializeLogin();
});
