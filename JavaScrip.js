// =============================
// Lista de laptops disponibles
// =============================
const laptops = [
  { nombre: "Dell G5", uso: "gaming", precio: 3500, carrera: "ingenieria", marca: "dell", pantalla: "15.6", ram: "16", img: "recomendada1.jpg", concepto: "Ideal para ingeniería y juegos de alto rendimiento" },
  { nombre: "HP Pavilion 14", uso: "ofimatica", precio: 2000, carrera: "administracion", marca: "hp", pantalla: "14", ram: "8", img: "recomendada2.jpg", concepto: "Perfecta para administración y tareas de oficina" },
  { nombre: "Lenovo IdeaPad 3", uso: "estudios", precio: 2800, carrera: "ingenieria", marca: "lenovo", pantalla: "15.6", ram: "8", img: "recomendada3.jpg", concepto: "Recomendada para estudiantes de ingeniería y estudios generales" },
  { nombre: "Asus VivoBook", uso: "diseno", precio: 3200, carrera: "diseno", marca: "asus", pantalla: "14", ram: "8", img: "recomendada4.jpg", concepto: "Perfecta para diseño gráfico y multimedia" },
  { nombre: "MacBook Air M1", uso: "programacion", precio: 4200, carrera: "ingenieria", marca: "apple", pantalla: "13", ram: "8", img: "recomendada5.jpg", concepto: "Ideal para programación y trabajos creativos" }
];

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // Botón recomendar en index.html
  // =============================
  const recomendarBtn = document.getElementById("recomendarBtn");
  if (recomendarBtn) {
    recomendarBtn.addEventListener("click", () => {
      const filtros = {
        uso: document.getElementById("uso").value,
        presupuesto: document.getElementById("presupuesto").value,
        carrera: document.getElementById("carrera").value,
        marca: document.getElementById("marca").value,
        pantalla: document.getElementById("pantalla").value,
        ram: document.getElementById("ram").value
      };
      localStorage.setItem("filtrosLaptop", JSON.stringify(filtros));
      window.location.href = "productos.html";
    });
  }

  // =============================
  // Render de productos en productos.html
  // =============================
  const contenedor = document.getElementById("resultados");
  if (contenedor) {
    const filtros = JSON.parse(localStorage.getItem("filtrosLaptop")) || {};

    const precioValido = (laptopPrecio, filtroPrecio) => {
      if (!filtroPrecio) return true;
      if (filtroPrecio.includes("+")) return laptopPrecio >= parseInt(filtroPrecio);
      const [min, max] = filtroPrecio.split("-").map(p => parseInt(p));
      return laptopPrecio >= min && laptopPrecio <= max;
    };

    let resultados = laptops.filter(laptop => {
      return precioValido(laptop.precio, filtros.presupuesto) &&
             (!filtros.uso || laptop.uso === filtros.uso) &&
             (!filtros.carrera || laptop.carrera === filtros.carrera) &&
             (!filtros.marca || filtros.marca === "cualquiera" || laptop.marca === filtros.marca) &&
             (!filtros.pantalla || laptop.pantalla === filtros.pantalla) &&
             (!filtros.ram || laptop.ram === filtros.ram);
    });

    if (resultados.length === 0) {
      resultados = laptops;
    }

    contenedor.innerHTML = "";
    resultados.forEach(laptop => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.style.width = "250px";
      div.innerHTML = `
        <div class="precio">S/ ${laptop.precio}</div>
        <img src="imagenes/${laptop.img}" alt="${laptop.nombre}" style="width:100%; height:auto;">
        <h3>${laptop.nombre}</h3>
        <p><b>Marca:</b> ${laptop.marca}</p>
        <p><b>Pantalla:</b> ${laptop.pantalla}"</p>
        <p><b>RAM:</b> ${laptop.ram}GB</p>
        <p><b>Uso:</b> ${laptop.uso}</p>
        <p>${laptop.concepto}</p>
        <button>Ver más</button>
      `;
      contenedor.appendChild(div);
    });

    localStorage.removeItem("filtrosLaptop");
  }

  // =============================
  // Submenú de contacto
  // =============================
  const btnContacto = document.getElementById("btn-contacto");
  const submenuRedes = document.getElementById("submenu-redes");

  if (btnContacto && submenuRedes) {
    btnContacto.addEventListener("click", (e) => {
      e.preventDefault();
      submenuRedes.classList.toggle("activo");
    });
  }
  //MODALL
  document.addEventListener("click", function (e) {
  if (e.target.classList.contains("ver-mas")) {
    const nombre = e.target.dataset.nombre;
    const descripcion = e.target.dataset.descripcion;
    const precio = e.target.dataset.precio;
    const imagen = e.target.dataset.imagen;

    document.getElementById("modal-titulo").textContent = nombre;
    document.getElementById("modal-descripcion").textContent = descripcion;
    document.getElementById("modal-precio").textContent = `Precio: ${precio}`;
    document.getElementById("modal-imagen").src = imagen;

    document.getElementById("producto-modal").style.display = "flex";
  }
});

document.getElementById("cerrar-modal").addEventListener("click", function () {
  document.getElementById("producto-modal").style.display = "none";
});

});
