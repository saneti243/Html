document.addEventListener('DOMContentLoaded', () => {
    
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    
    if (regionSelect && comunaSelect) {
        const datosRegiones = {
            "Región Metropolitana": ["Santiago", "Providencia", "Maipú", "Puente Alto"],
            "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
            "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"]
        };

        regionSelect.innerHTML = '<option value="">Seleccione una región...</option>';
        Object.keys(datosRegiones).forEach(region => {
            regionSelect.innerHTML += `<option value="${region}">${region}</option>`;
        });

        regionSelect.addEventListener('change', (e) => {
            const comunas = datosRegiones[e.target.value] || [];
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna...</option>';
            comunas.forEach(c => {
                comunaSelect.innerHTML += `<option value="${c}">${c}</option>`;
            });
        });
    }

    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            let esValido = true;

            const mostrarError = (id, mensaje) => {
                const divError = document.getElementById(`error-${id}`);
                if (divError) {
                    divError.innerText = mensaje || '';
                    divError.style.display = mensaje ? 'block' : 'none';
                } else if (mensaje) {
                    alert(mensaje);
                }
                if (mensaje) esValido = false;
            };

            const nombre = document.getElementById('nombre') ? document.getElementById('nombre').value.trim() : '';
            if (nombre === '') mostrarError('nombre', '* El nombre completo es obligatorio.');
            else mostrarError('nombre', '');

            const correo = document.getElementById('correo') ? document.getElementById('correo').value.trim() : '';
            const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
            const correoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));
            
            if (!correoValido) {
                mostrarError('correo', '* Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
            } else {
                mostrarError('correo', '');
            }

            const runInput = document.getElementById('run');
            if (runInput) {
                const run = runInput.value.trim().toUpperCase();
                const runRegex = /^[0-9K]+$/;
                if (run.length < 7 || run.length > 9 || !runRegex.test(run)) {
                    mostrarError('run', '* RUN inválido. Use entre 7 y 9 caracteres, sin puntos ni guiones (Ej: 19011022K).');
                } else {
                    mostrarError('run', '');
                }
            }

            const password = document.getElementById('password') ? document.getElementById('password').value : '';
            if (password.length < 4 || password.length > 10) {
                mostrarError('password', '* La contraseña debe tener entre 4 y 10 caracteres.');
            } else {
                mostrarError('password', '');
            }

            if (regionSelect && regionSelect.value === '') mostrarError('region', '* Seleccione una región.');
            else mostrarError('region', '');

            if (comunaSelect && comunaSelect.value === '') mostrarError('comuna', '* Seleccione una comuna.');
            else mostrarError('comuna', '');

            if (esValido) {
                let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
                if (usuarios.find(u => u.correo === correo)) {
                    mostrarError('correo', '* Este correo ya está registrado.');
                    return;
                }

                let rolAsignado = "cliente";
                if (correo.includes("admin")) rolAsignado = "administrador";
                if (correo.includes("vendedor")) rolAsignado = "vendedor";

                usuarios.push({ 
                    run: runInput.value.trim().toUpperCase(),
                    nombre: nombre, 
                    correo: correo, 
                    password: password,
                    region: regionSelect.value,
                    comuna: comunaSelect.value,
                    rol: rolAsignado 
                });
                
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
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

            const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
            const correoValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

            if (!correoValido) {
                if (errorCorreo) {
                    errorCorreo.innerText = '* Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
                    errorCorreo.style.display = 'block';
                } else alert('* Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
                esValido = false;
            } else if (errorCorreo) errorCorreo.style.display = 'none';

            if (password.length < 4 || password.length > 10) {
                if (errorPass) {
                    errorPass.innerText = '* La contraseña debe tener entre 4 y 10 caracteres.';
                    errorPass.style.display = 'block';
                } else alert('* La contraseña debe tener entre 4 y 10 caracteres.');
                esValido = false;
            } else if (errorPass) errorPass.style.display = 'none';

            if (esValido) {
                let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
                const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password);

                if (usuarioEncontrado) {
                    localStorage.setItem('sesionIniciada', correo);
                    localStorage.setItem('rolUsuario', usuarioEncontrado.rol);
                    
                    if (usuarioEncontrado.rol === "administrador" || usuarioEncontrado.rol === "vendedor") {
                        window.location.href = "../admin/home-admin.html";
                    } else {
                        window.location.href = "../../index.html";
                    }
                } else {
                    if (errorCorreo) {
                        errorCorreo.innerText = '* Correo o contraseña incorrectos.';
                        errorCorreo.style.display = 'block';
                    } else alert('* Correo o contraseña incorrectos.');
                }
            }
        });
    }
});