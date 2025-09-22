// VARIABLES
const container = document.querySelector('.horizontal-scroll'); // contenedor principal
const sections = document.querySelectorAll('header, section'); // todas las secciones
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a");
const closeBtn = document.getElementById("close-sidebar"); // botón cerrar
const skillButtons = document.querySelectorAll(".skills-filter button");
const skillGroups = document.querySelectorAll(".skills-group");

let currentIndex = 0;


//////////////// APARTADO DE SCROLL HORIZONTAL //////////////////

// Función para mostrar una sección en base a su índice
function showSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    currentIndex = index;
    const offset = -index * window.innerWidth;
    container.style.transform = `translateX(${offset}px)`;
}

// --- Scroll vertical → navegación horizontal --- (envez de que sea vertical, que sea horizontal)
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        showSection(currentIndex + 1); // scroll hacia abajo
    } else if (e.deltaY < 0) {
        showSection(currentIndex - 1); // scroll hacia arriba
    }
});

///////////////// APARTADO DE SIDEBAR //////////////////

// Al hacer clic en el ícono del menú → abrir sidebar y ocultar hamburguesa
menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
    menuToggle.classList.add("hidden"); // ocultar el botón ☰
});

// Al hacer clic en un enlace del sidebar ir a la sección y cerrar sidebar
sidebarLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // evitar el salto brusco del #id
        showSection(i);     // mover horizontalmente
        sidebar.classList.remove("active"); // cerrar sidebar
        menuToggle.classList.remove("hidden"); // volver a mostrar el botón ☰
    });
});

// --- Botón ✕ para cerrar el sidebar ---
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
        menuToggle.classList.remove("hidden"); // volver a mostrar el botón ☰
    });
}

///////////////// APARTADO HABILIDADES //////////////////

// === FILTRADOR DE HABILIDADES ===
function showSkills(category) {
    skillGroups.forEach(group => {
        if (group.dataset.category === category) {
            group.classList.add("active");
        } else {
            group.classList.remove("active");
        }
    });
}

// Evento para cada botón
skillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // quitar la clase activa de todos
        skillButtons.forEach(b => b.classList.remove("active"));
        // marcar el botón pulsado
        btn.classList.add("active");
        // mostrar la categoría correspondiente
        showSkills(btn.dataset.category);
    });
});

// Inicialización: mostramos frontend por defecto
showSkills("frontend");