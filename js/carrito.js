let productos = JSON.parse(localStorage.getItem('productosTienda'));

if (!productos || productos.length === 0) {
    productos = [
        { id: 1, nombre: "Audífonos In-Ear KZ EDX Pro", precio: 67, categoria: "Audio Personal", imagen: "" },
        { id: 2, nombre: "Zapatillas Retro Air Jordan 1", precio: 67, categoria: "Calzado / Streetwear", imagen: "images/retro 1.jpg" },
        { id: 3, nombre: "Juego: Resident Evil Requiem", precio: 67, categoria: "Videojuegos Digitales", imagen: "" },
        { id: 4, nombre: "Manta ultra suave para sobre sábanas", precio: 67, categoria: "Mascotas / Hogar", imagen: "" }
    ];
    localStorage.setItem('productosTienda', JSON.stringify(productos));
} else {
    let actualizados = false;
    productos = productos.map(p => {
        if (p.imagen === undefined) {
            p.imagen = "";
            actualizados = true;
        }
        return p;
    });
    if (actualizados) localStorage.setItem('productosTienda', JSON.stringify(productos));
}

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const productosActuales = JSON.parse(localStorage.getItem('productosTienda')) || [];
    
    const rutaActual = window.location.pathname;
    const prefijoRuta = rutaActual.includes('vista/') ? '../../' : '';

    productosActuales.forEach(prod => {
        const article = document.createElement('article');
        article.className = 'producto-card';
        
        let contenidoImagen = `<div class="producto-img" style="height: 200px; display:flex; align-items:center; justify-content:center; background:#eee; color:#999; margin-bottom: 15px; border-radius:4px;">[ Sin Imagen ]</div>`;
        
        if (prod.imagen && prod.imagen.trim() !== "") {
            let rutaImg = prod.imagen.startsWith('http') ? prod.imagen : prefijoRuta + prod.imagen;
            
            contenidoImagen = `<img src="${rutaImg}" alt="${prod.nombre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; background-color: #f8f9fa;" onerror="this.src='https://via.placeholder.com/200?text=Error+de+Enlace'">`;
        }

        article.innerHTML = `
            ${contenidoImagen}
            <h2>${prod.nombre}</h2>
            <p style="font-size: 12px; color: gray;">${prod.categoria}</p>
            <p class="precio">$${prod.precio.toLocaleString('es-CL')}</p>
            <button class="btn btn-add" onclick="agregarAlCarrito(${prod.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(article);
    });
}

window.agregarAlCarrito = function(productoId) {
    const idNumero = parseInt(productoId);
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosActuales = JSON.parse(localStorage.getItem('productosTienda')) || [];
    const productoSeleccionado = productosActuales.find(p => p.id === idNumero);
    
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`¡Éxito! Has añadido "${productoSeleccionado.nombre}" al carrito.`);
        actualizarContadorCarrito();
    } else {
        alert("Error: No se encontró el producto.");
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
        const esAdmin = usuario.includes('admin');
        const rutaActual = window.location.pathname;
        
        let enlaceAdmin = "";
        
        if (esAdmin) {
            let rutaAdmin = "vista/admin/home-admin.html"; 
            if (rutaActual.includes('tienda/')) rutaAdmin = "../admin/home-admin.html";
            if (rutaActual.includes('admin/')) rutaAdmin = "home-admin.html";

            enlaceAdmin = `<a href="${rutaAdmin}" style="background-color: #28a745; color: white; padding: 5px 10px; border-radius: 4px; text-decoration: none; margin-right: 15px;">⚙️ Panel Admin</a>`;
        }

        contenedorAuth.innerHTML = `
            ${enlaceAdmin}
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
    const rutaActual = window.location.pathname;
    const usuario = localStorage.getItem('sesionIniciada');
    
    if (rutaActual.includes('admin/')) {
        if (!usuario || !usuario.includes('admin')) {
            alert('Acceso denegado. Esta sección es solo para administradores.');
            window.location.href = "../../index.html";
            return;
        }
    }

    renderizarProductos();
    actualizarContadorCarrito();
    actualizarMenuSesion();
});