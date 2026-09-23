const productos = [
    { 
        id: 1, 
        nombre: "Audífonos In-Ear KZ EDX Pro", 
        precio: 67, 
        categoria: "Audio Personal" 
    },
    { 
        id: 2, 
        nombre: "Zapatillas Retro Air Jordan 1", 
        precio: 67, 
        categoria: "Calzado / Streetwear" 
    },
    { 
        id: 3, 
        nombre: "Juego: Resident Evil Requiem", 
        precio: 67, 
        categoria: "Videojuegos Digitales" 
    },
    { 
        id: 4, 
        nombre: "Manta ultra suave para sobre sábanas", 
        precio: 67, 
        categoria: "Mascotas / Hogar" 
    }
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


function agregarAlCarrito(productoId) {
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    
    const productoSeleccionado = productos.find(p => p.id === productoId);
    
    if (productoSeleccionado) {
        
        carrito.push(productoSeleccionado);
        
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        alert(`Has añadido "${productoSeleccionado.nombre}" al carrito.`);
        actualizarContadorCarrito();
    }
}

function actualizarContadorCarrito() {
    const contadorElemento = document.getElementById('contador-carrito');
    if (contadorElemento) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorElemento.innerText = carrito.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadorCarrito();
});