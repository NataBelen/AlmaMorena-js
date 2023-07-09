
console.log("Bienvenidos a Alma Morena");

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

const productos = [
  {
    "id": 1,
    "nombre": "GOTERO",
    "descripcion": "Tintura Madre de Lavanda y CBD - 30ml",
    "precio": 5500,
    "cantidad": 0,
    "stock": 50,
    "imagen": "./images/imgGotero.jpeg"
  },
  {
    "id": 2,
    "nombre": "SPRAY",
    "descripcion": "Tintura Madre de Lavanda y CBD - 50ml",
    "precio": 1800,
    "cantidad": 0,
    "stock": 50,
    "imagen": "./images/imgSpray.jpeg"
  },
  {
    "id": 3,
    "nombre": "CREMA",
    "descripcion": "Tintura Madre de Lavanda y CBD",
    "precio": 2500,
    "cantidad": 0,
    "stock": 50,
    "imagen": "./images/imgCrema.jpeg"
  },
  {
    "id": 4,
    "nombre": "ROLL",
    "descripcion": "Tintura Madre de Lavanda y CBD - 10ml",
    "precio": 1300,
    "cantidad": 0,
    "stock": 50,
    "imagen": "./images/imgRoll.jpeg"
  },
  {
    "id": 5,
    "nombre": "COMBO",
    "descripcion": "Tintura Madre de Lavanda y CBD - Combo",
    "precio": 10000,
    "cantidad": 0,
    "stock": 10,
    "imagen": "./images/imgCombo.jpeg"
  },
  {
    "id": 6,
    "nombre": "SPRAY 100cc",
    "descripcion": "Tintura Madre de Lavanda y CBD - 100ml",
    "precio": 2700,
    "cantidad": 0,
    "stock": 50,
    "imagen": "./images/imgSpraydos.jpeg"
  }
]

let carritoCompras = [];

console.log(productos);

let contenedorProductos = document.getElementById("contenedorProductos");

console.log(contenedorProductos);

// Cargar datos del carrito desde localStorage
const carritoComprasLocalStorage = localStorage.getItem("carritoCompras");
if (carritoComprasLocalStorage) {
  carritoCompras = JSON.parse(carritoComprasLocalStorage);
}

productos.forEach((productoSolo) => {
  console.log(productoSolo.id);
  console.log(productoSolo.nombre);

  let contenedor = document.createElement("div");

  contenedor.innerHTML = `
    <div class="col">
      <div class="card">
        <img src=${productoSolo.imagen} class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${productoSolo.nombre}</h5>
          <h2>$${productoSolo.precio}</h2>
          <p class="card-text">${productoSolo.descripcion}</p>
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-outline-secondary mx-2 botonComprar" type="button">LO QUIERO!</button>
        </div>
      </div>
    </div>
  `;
 contenedorProductos.append(contenedor);

  const botonComprar = contenedor.querySelector(".botonComprar");
  botonComprar.addEventListener("click", () => {
    carritoCompras.push({
      id: productoSolo.id,
      nombre: productoSolo.nombre,
      descripcion: productoSolo.descripcion,
      precio: productoSolo.precio,
      cantidad: productoSolo.cantidad,
      stock: productoSolo.stock,
      imagen: productoSolo.imagen
    });

    // Guardar datos actualizados en localStorage
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));

    mostrarAlerta();
  });
});

verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modalHeader";
  modalHeader.innerHTML = `
    <h1 class="modalTitulo"> MI CARRITO </h1>
  `;
  modalContainer.append(modalHeader);

  const modalButton = document.createElement("h1");
  modalButton.innerText = "x";
  modalButton.className = "modalBoton";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalButton);

  carritoCompras.forEach((producto, index) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modalContent";
    carritoContent.innerHTML = `
      <img src=${producto.imagen}>
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="btnEliminar" data-index=${index}>Eliminar</button>
    `;
    modalContainer.append(carritoContent);
  });

  const total = carritoCompras.reduce((acc, el) => acc + el.precio, 0);
  const totalCompra = document.createElement("div");
  totalCompra.className = "totalCompra";
  totalCompra.innerHTML = `TOTAL A PAGAR: $${total}`;
 
  modalContainer.append(totalCompra);

  const btnEliminar = modalContainer.querySelectorAll(".btnEliminar");
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      carritoCompras.splice(index, 1);

      // Guardar datos actualizados en localStorage
      localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));

      // Actualizar el contenido del carrito
      verCarrito.click();
    });
  });
}); 

const volverBtn = document.getElementById("volverBtn");

volverBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

/* Obtener el botón "LO QUIERO!" */
const botonComprar = contenedor.querySelector(".botonComprar");

      botonComprar.addEventListener("click", () => {
        carritoCompras.push(producto);
        mostrarAlerta();
      });

// Llamar productos con JSON (no logro que funcione!)

/* console.log("Bienvenidos a Alma Morena");

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");

let carritoCompras = JSON.parse(localStorage.getItem("carritoCompras")) || [];

const getProducts = async () => {
  try {
    const response = await fetch("productos.json");
    const data = await response.json();

    let contenedorProductos = document.getElementById("contenedorProductos");

    data.forEach((producto) => {
      let contenedor = document.createElement("div");

      contenedor.innerHTML = `
        <div class="col">
          <div class="card">
            <img src=${producto.imagen} class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <h2>$${producto.precio}</h2>
              <p class="card-text">${producto.descripcion}</p>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-outline-secondary mx-2 botonComprar" type="button">LO QUIERO!</button>
            </div>
          </div>
        </div>
      `;

      contenedorProductos.append(contenedor);

  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

// Función para redirigir al carrito
function redirigirAlCarrito() {
  window.location.href = "./carrito.html";
}

// Función para seguir comprando
function continuarComprando() {
  window.location.href = "./index.html";
}

verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modalHeader";
  modalHeader.innerHTML = `
    <h1 class="modalTitulo">MI CARRITO</h1>
  `;
  modalContainer.append(modalHeader);

  const modalButton = document.createElement("h1");
  modalButton.innerText = "x";
  modalButton.className = "modalBoton";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalButton);

  carritoCompras.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modalContent";
    carritoContent.innerHTML = `
      <img src=${producto.imagen}>
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
    `;
    modalContainer.append(carritoContent);
  });

  const total = carritoCompras.reduce((acc, el) => acc + el.precio, 0);
  const totalCompra = document.createElement("div");
  totalCompra.className = "totalCompra";
  totalCompra.innerHTML = `TOTAL A PAGAR: $${total}`;

  modalContainer.append(totalCompra);
});

getProducts()


// Función para mostrar una alerta con SweetAlert2
/* function mostrarAlerta() {
  Swal.fire({
    title: "El producto se agregó al carrito",
    text: "¡El producto ha sido agregado con éxito!",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Ver carrito",
    cancelButtonText: "Seguir comprando",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      redirigirAlCarrito();
    } else {
      continuarComprando();
    }
  });
}
 */

