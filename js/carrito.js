const productos = [
    { id: 1, nombre: "Audífonos In-Ear KZ EDX Pro", precio: 67, categoria: "Audio Personal" },
    { id: 2, nombre: "Zapatillas Retro Air Jordan 1", precio: 67, categoria: "Calzado / Streetwear" },
    { id: 3, nombre: "Juego: Resident Evil Requiem", precio: 67, categoria: "Videojuegos Digitales" },
    { id: 4, nombre: "Manta ultra suave para sobre sábanas", precio: 67, categoria: "Mascotas / Hogar" }
];

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productos.forEach(prod => {
        const article = document.createElement('article');
        article.className = 'producto-card';
        
        article.innerHTML = `
            <div class="producto-img">[ Imagen ]</div>
            <h2>${prod.nombre}</h2>
            <p style="font-size: 12px; color: gray;">${prod.categoria}</p>
            <p class="precio">$${prod.precio}</p>
            <button class="btn btn-add" onclick="agregarAlCarrito(${prod.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(article);
    });
}

window.agregarAlCarrito = function(productoId) {
    const idNumero = parseInt(productoId);
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoSeleccionado = productos.find(p => p.id === idNumero);
    
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`¡Éxito! Has añadido "${productoSeleccionado.nombre}" al carrito.`);
        actualizarContadorCarrito();
    } else {
        alert("Error: No se encontró el producto en la base de datos.");
    }
};

function actualizarContadorCarrito() {
    const contadorElemento = document.getElementById('contador-carrito');
    if (contadorElemento) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorElemento.innerText = carrito.length;
    }
}

function actualizarMenuSesion() {
    const contenedorAuth = document.querySelector('.auth-links');
    const usuario = localStorage.getItem('sesionIniciada');

    if (usuario && contenedorAuth) {
        contenedorAuth.innerHTML = `
            <span style="font-weight: bold; color: #007bff;">👤 Hola, ${usuario}</span> | 
            <a href="#" onclick="cerrarSesion()" style="color: red; cursor: pointer; text-decoration: none; margin-left: 10px;">Cerrar sesión</a>
        `;
    }
}

window.cerrarSesion = function() {
    localStorage.removeItem('sesionIniciada');
    const rutaActual = window.location.pathname;
    if (rutaActual.includes('vista/')) {
        window.location.href = "../../index.html";
    } else {
        window.location.href = "index.html";
        window.location.reload();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
    actualizarMenuSesion();
});