const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API
const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'; // Ruta para obtener películas populares
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc';


//------------------------------- CREANDO LA PAGINATIONEXP SD-----------------------------------



// Obtén elementos de paginación
const backButton = document.getElementById('backpage');
const goAheadButton = document.getElementById('goaheadpage');
const pageNumberButtons = document.querySelectorAll('.paginationexp-button:not(.back):not(.goahead)');

// Inicializa la página actual
let currentPage = 1;

// Función para actualizar la página
function updatePage() {
  // Lógica para mostrar u ocultar elementos en la página actual
  // Puedes cargar las imágenes y la información de las películas aquí

  // Actualiza la clase "active" en el botón de la página actual
  pageNumberButtons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Función para ir a la página anterior
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
}

// Función para ir a la página siguiente
function goToNextPage() {
  if (currentPage < pageNumberButtons.length) {
    currentPage++;
    updatePage();
  }
}

// Agregar oyentes de eventos a los botones de paginación
backButton.addEventListener('click', goToPreviousPage);
goAheadButton.addEventListener('click', goToNextPage);

pageNumberButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    currentPage = index + 1;
    updatePage();
  });
});

// Inicializa la página
updatePage();

console.log("por aqui anda wysde");
