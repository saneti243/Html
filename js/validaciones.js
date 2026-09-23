document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault(); 
            let esValido = true;

            const mostrarError = (id, mensaje) => {
                const divError = document.getElementById(`error-${id}`);
                if (mensaje) {
                    divError.innerText = mensaje;
                    divError.style.display = 'block';
                    esValido = false;
                } else {
                    divError.style.display = 'none';
                    divError.innerText = '';
                }
            };

            const nombre = document.getElementById('nombre').value.trim();
            if (nombre === '') {
                mostrarError('nombre', '* El nombre completo es obligatorio.');
            } else {
                mostrarError('nombre', '');
            }

            const correo = document.getElementById('correo').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                mostrarError('correo', '* Ingrese un correo electrónico válido.');
            } else {
                mostrarError('correo', '');
            }

            const password = document.getElementById('password').value;
            if (password.length < 6) {
                mostrarError('password', '* La contraseña debe tener al menos 6 caracteres.');
            } else {
                mostrarError('password', '');
            }

            const confirmPass = document.getElementById('confirm-password').value;
            if (password !== confirmPass || confirmPass === '') {
                mostrarError('confirm', '* Las contraseñas no coinciden.');
            } else {
                mostrarError('confirm', '');
            }

            const region = document.getElementById('region').value;
            if (region === '') mostrarError('region', '* Seleccione una región.');
            else mostrarError('region', '');

            const comuna = document.getElementById('comuna').value;
            if (comuna === '') mostrarError('comuna', '* Seleccione una comuna.');
            else mostrarError('comuna', '');

            if (esValido) {
                alert("¡Registro exitoso! Redirigiendo al login...");
                window.location.href = "login.html";
            }
        });
    }

    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            let esValido = true;

            const correo = document.getElementById('login-correo').value.trim();
            const password = document.getElementById('login-password').value;
            
            const errorCorreo = document.getElementById('error-login-correo');
            const errorPass = document.getElementById('error-login-password');

            if (correo === '') {
                errorCorreo.innerText = '* Ingrese su correo.';
                errorCorreo.style.display = 'block';
                esValido = false;
            } else {
                errorCorreo.style.display = 'none';
            }

            if (password === '') {
                errorPass.innerText = '* Ingrese su contraseña.';
                errorPass.style.display = 'block';
                esValido = false;
            } else {
                errorPass.style.display = 'none';
            }

            if (esValido) {
                if (correo.includes("admin")) {
                    window.location.href = "../admin/home-admin.html";
                } else {
                    window.location.href = "../../index.html";
                }
            }
        });
    }
});