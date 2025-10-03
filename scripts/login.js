document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const rememberCheckbox = document.querySelector('input[type="checkbox"]');
    const loginBtn = document.querySelector('.btn');
    const forgotPasswordLink = document.querySelector('.remember-forgot a');
    const registerLink = document.querySelector('.register-link a');

    const validUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'usuario', password: 'password123' },
        { username: 'tiktok', password: 'emprendedor2024' },
        { username: 'dashboard', password: 'dashboard123' }
    ];

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

    function validateUsername(username) {
        return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function addInputValidation() {
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error', 'success');
                
                if (this.value.length > 0) {
                    const isValid = this.type === 'text' ? 
                        validateUsername(this.value) : 
                        validatePassword(this.value);
                    
                    this.classList.add(isValid ? 'success' : 'error');
                }
            });

            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    function animateButton() {
        loginBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loginBtn.style.transform = 'scale(1)';
        }, 150);
    }

    function handleLogin(username, password, remember) {
        const user = validUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
            showNotification('¡Login exitoso! Redirigiendo...', 'success');
            
            if (remember) {
                localStorage.setItem('rememberedUser', username);
                localStorage.setItem('loginTime', new Date().getTime());
            }
            
            sessionStorage.setItem('currentUser', username);
            sessionStorage.setItem('isLoggedIn', 'true');
            
            setTimeout(() => {
                if (username === 'dashboard') {
                    window.location.href = '../hmtl/dashboard.html';
                } else {
                    window.location.href = '../hmtl/main.html';
                }
            }, 1500);
            
            return true;
        } else {
            showNotification('Usuario o contraseña incorrectos', 'error');
            passwordInput.value = '';
            passwordInput.focus();
            
            usernameInput.classList.add('error');
            passwordInput.classList.add('error');
            
            setTimeout(() => {
                usernameInput.classList.remove('error');
                passwordInput.classList.remove('error');
            }, 3000);
            
            return false;
        }
    }

    function loadRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        const loginTime = localStorage.getItem('loginTime');
        
        if (rememberedUser && loginTime) {
            const daysSinceLogin = (new Date().getTime() - parseInt(loginTime)) / (1000 * 60 * 60 * 24);
            
            if (daysSinceLogin <= 30) {
                usernameInput.value = rememberedUser;
                rememberCheckbox.checked = true;
                usernameInput.parentElement.classList.add('focused');
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
            
            animateButton();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            const remember = rememberCheckbox.checked;
            
            if (!username || !password) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateUsername(username)) {
                showNotification('El usuario debe tener al menos 3 caracteres y solo letras, números y guiones bajos', 'error');
                usernameInput.focus();
                return;
            }
            
            if (!validatePassword(password)) {
                showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
                passwordInput.focus();
                return;
            }
            
            loginBtn.disabled = true;
            loginBtn.textContent = 'Iniciando...';
            
            setTimeout(() => {
                const success = handleLogin(username, password, remember);
                
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

    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (usernameInput === document.activeElement || passwordInput === document.activeElement)) {
                form.dispatchEvent(new Event('submit'));
            }
            
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                usernameInput.focus();
                usernameInput.select();
            }
        });
    }

    function checkExistingSession() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const currentUser = sessionStorage.getItem('currentUser');
        
        if (isLoggedIn === 'true' && currentUser) {
            showNotification(`Ya tienes una sesión activa como ${currentUser}`, 'info');
            setTimeout(() => {
                window.location.href = '../hmtl/main.html';
            }, 2000);
        }
    }

    function initializeLogin() {
        checkExistingSession();
        loadRememberedUser();
        addInputValidation();
        setupFormSubmission();
        setupForgotPassword();
        setupRegisterLink();
        addKeyboardShortcuts();
        
        usernameInput.focus();
        
        showNotification('Sistema de login cargado correctamente', 'success');
    }

    initializeLogin();
});