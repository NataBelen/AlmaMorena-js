/* Obtener el botón "LO QUIERO!" */
/* const botonComprar = contenedor.querySelector(".botonComprar");

      botonComprar.addEventListener("click", () => {
        carritoCompras.push(producto);
        mostrarAlerta();
      }); */
      
    function mostrarAlerta() {
    Swal.fire({
    title: "El producto se agregó al carrito",
    text: "¡El producto ha sido agregado con éxito!",
    icon: "success",
    backdrop: true,
    showCancelButton: true,
    position: "top-end",
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
