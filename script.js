// VARIABLES
const container = document.querySelector('.horizontal-scroll'); // contenedor
const sections = document.querySelectorAll('header, section'); // secciones
const menuToggle = document.getElementById("menu-toggle"); // menú
const sidebar = document.getElementById("sidebar"); // sidebar
const sidebarLinks = document.querySelectorAll(".sidebar nav ul li a"); // enlaces
const closeBtn = document.getElementById("close-sidebar"); // cerrar botón
const carousel = document.querySelector(".carousel"); // carrusel
const prevBtn = document.getElementById("prevBtn"); // anterior botón
const nextBtn = document.getElementById("nextBtn"); // siguiente botón
const filterBtns = document.querySelectorAll('.projects-filter .filter-btn'); // filtros
const projectCards = document.querySelectorAll('.projects-grid .project-card'); // proyectos

let currentIndex = 0; // índice
let angle = 0; // ángulo

// para saber si el sidebar está abierto
const isSidebarOpen = () => sidebar.classList.contains("active");

/* función abre el menú lateral, oculta el botón hamburguesa, ajusta atributos de accesibilidad*/
function openSidebar() {
    sidebar.classList.add("active");
    menuToggle.classList.add("hidden");       
    // Accesibilidad:
    sidebar.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    // Enfocar el botón de cerrar al abrir
    if (closeBtn) closeBtn.focus();
}

// función cierra el menú lateral, muestra el botón hamburguesa, ajusta atributos de accesibilidad
function closeSidebar() {
    sidebar.classList.remove("active");
    menuToggle.classList.remove("hidden");
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

// Scroll vertical navegación horizontal (solo si el sidebar NO está abierto)
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
        e.preventDefault(); // evitar salto brusco del #id
        showSection(i);    // mover horizontalmente
        closeSidebar();   // cerrar sidebar con ARIA/foco
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


// FILTRADOR DE PROYECTOS
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // estado activo de botones
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selected = btn.dataset.tool; // 'all', 'html', 'css', etc.

        projectCards.forEach(card => {
            const tools = (card.dataset.tools || '')
                .split(',')
                .map(s => s.trim().toLowerCase())
                .filter(Boolean);

            const show = (selected === 'all') || tools.includes(selected.toLowerCase());
            card.style.display = show ? '' : 'none';
        });
    });
});
