// CREAR ARREGLO DEL CARRITO
let carrito = [];

// SELECCIONAR ELEMENTOS
const botones = document.querySelectorAll(".agregar");
const contador = document.getElementById("contador");
const lista = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const vaciar = document.getElementById("vaciar-carrito");
const pagar = document.querySelector("#carrito #pagar");
const mensaje = document.getElementById("mensaje-carrito");

// ELEMENTOS DE LA VENTANA DE PAGO
const ventanaPago = document.getElementById("ventanaPago");
const resumenPago = document.getElementById("resumenPago");
const totalPago = document.getElementById("totalPago");

// AGREGAR PRODUCTOS
botones.forEach(function(boton) {
    boton.addEventListener("click", function() {

        let producto = boton.dataset.producto;
        let precio = Number(boton.dataset.precio);

        carrito.push({
            nombre: producto,
            precio: precio
        });

        actualizarCarrito();

        if (mensaje) {
            mensaje.textContent = producto + " se agregó al carrito";
            mensaje.style.display = "block";
        }
    });
});

// ACTUALIZAR CARRITO
function actualizarCarrito() {

    contador.textContent = carrito.length;
    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach(function(producto) {

        let elemento = document.createElement("li");

        elemento.textContent =
            producto.nombre + " - $" +
            producto.precio.toFixed(2) + " MXN";

        lista.appendChild(elemento);
        suma += producto.precio;
    });

    total.textContent = suma.toFixed(2);
}

// VACIAR CARRITO
vaciar.addEventListener("click", function() {

    carrito = [];
    actualizarCarrito();

    if (mensaje) {
        mensaje.textContent = "El carrito está vacío.";
    }
});

// MOSTRAR RESUMEN DE COMPRA
function mostrarResumen() {

    resumenPago.innerHTML = "";
    let suma = 0;

    carrito.forEach(function(producto) {

        let elemento = document.createElement("li");

        elemento.textContent =
            producto.nombre + " - $" +
            producto.precio.toFixed(2) + " MXN";

        resumenPago.appendChild(elemento);
        suma += producto.precio;
    });

    totalPago.textContent = suma.toFixed(2);
}

// ABRIR VENTANA DE PAGO
pagar.addEventListener("click", function() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos.");
        return;
    }

    mostrarResumen();
    ventanaPago.style.display = "flex";
});

// CERRAR VENTANA DE PAGO
document.getElementById("cerrarPago").addEventListener("click", function() {

    ventanaPago.style.display = "none";
});

// CONFIRMAR COMPRA
document.getElementById("confirmarPago").addEventListener("click", function() {

    let nombre = document.getElementById("nombreCliente").value.trim();
    let telefono = document.getElementById("telefonoCliente").value.trim();
    let direccion = document.getElementById("direccionCliente").value.trim();

    let formaPago = document.querySelector(
        'input[name="formaPago"]:checked'
    );

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    if (nombre === "" || telefono === "" || direccion === "") {
        alert("Por favor, completa todos tus datos.");
        return;
    }

    if (!formaPago) {
        alert("Selecciona una forma de pago.");
        return;
    }

    let suma = 0;

    carrito.forEach(function(producto) {
        suma += producto.precio;
    });

    alert(
        "¡Gracias por comprar en Moon Apple! 🍎\n\n" +
        "Cliente: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Total: $" + suma.toFixed(2) + " MXN\n" +
        "Forma de pago: " + formaPago.value + "\n\n" +
        "Tu pedido ha sido registrado correctamente.\n" +
        "Compra de demostración, no se realizó ningún cobro."
    );

    ventanaPago.style.display = "none";

    carrito = [];
    actualizarCarrito();

    document.getElementById("nombreCliente").value = "";
    document.getElementById("telefonoCliente").value = "";
    document.getElementById("direccionCliente").value = "";

    document.querySelectorAll('input[name="formaPago"]').forEach(function(opcion) {
        opcion.checked = false;
    });

    if (mensaje) {
        mensaje.textContent = "¡Gracias por tu compra!";
    }
});