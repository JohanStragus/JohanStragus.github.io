// VARIABLES
const container = document.querySelector('.horizontal-scroll'); // contenedor principal
const sections = document.querySelectorAll('header, section'); // todas las secciones
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");
const closeBtn = document.getElementById("close-sidebar"); // botón cerrar
const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let angle = 0;

// Helpers sidebar accesible
const isSidebarOpen = () => sidebar.classList.contains("active");

function openSidebar() {
    sidebar.classList.add("active");
    menuToggle.classList.add("hidden");               // ocultar el botón ☰
    // Accesibilidad:
    sidebar.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    // Enfocar el botón de cerrar al abrir
    if (closeBtn) closeBtn.focus();
}

function closeSidebar() {
    sidebar.classList.remove("active");
    menuToggle.classList.remove("hidden");            // volver a mostrar el botón ☰
    // Accesibilidad:
    sidebar.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    // Devolver el foco al botón hamburguesa
    menuToggle.focus();
}

//////////////// APARTADO DE SCROLL HORIZONTAL //////////////////

// Función para mostrar una sección en base a su índice
function showSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    currentIndex = index;
    const offset = -index * window.innerWidth;
    container.style.transform = `translateX(${offset}px)`;
}

// Scroll vertical → navegación horizontal (solo si el sidebar NO está abierto)
window.addEventListener('wheel', (e) => {
    if (isSidebarOpen()) return; // no navegar si el menú está abierto
    if (e.deltaY > 0) {
        showSection(currentIndex + 1); // scroll hacia abajo
    } else if (e.deltaY < 0) {
        showSection(currentIndex - 1); // scroll hacia arriba
    }
}, { passive: true });

//////////////// FIN APARTADO DE SCROLL HORIZONTAL //////////////////


///////////////// APARTADO DE SIDEBAR //////////////////

// Abrir sidebar (y ocultar hamburguesa)
menuToggle.addEventListener("click", () => {
    if (!isSidebarOpen()) openSidebar();
});

// Ir a la sección y cerrar sidebar
sidebarLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();              // evitar salto brusco del #id
        showSection(i);                  // mover horizontalmente
        closeSidebar();                  // cerrar sidebar con ARIA/foco
    });
});

// Botón ✕ para cerrar
if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
}

// Cerrar con tecla Escape cuando el sidebar está abierto
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isSidebarOpen()) {
        closeSidebar();
    }
});

///////////////// FIN APARTADO DE SIDEBAR //////////////////


/////////////// APARTADO CARRUSEL 3D //////////////////
if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener("click", () => {
        angle += 90; // gira hacia atrás
        carousel.style.transform = `rotateY(${angle}deg)`;
    });

    nextBtn.addEventListener("click", () => {
        angle -= 90; // gira hacia adelante
        carousel.style.transform = `rotateY(${angle}deg)`;
    });
}
/////////////// FIN APARTADO CARRUSEL 3D //////////////////
