
const productos = [
    { id: 1, nombre: "Producto #1", precio: 8000, categoria: "Categoria X" },
    { id: 2, nombre: "Producto #2", precio: 6000, categoria: "Categoria Y" },
    { id: 3, nombre: "Producto #3", precio: 10000, categoria: "Categoria Z" }
];

function guardarEnCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoSeleccionado = productos.find(p => p.id === productoId);
    
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${productoSeleccionado.nombre} añadido al carrito.`);
    }
}