// Agregar un evento de escucha al botón de búsqueda
document.querySelector('button').addEventListener('click', searchMovies);

function searchMovies() {
  const searchQuery = document.querySelector('#searchInput').value;
  const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API de TMDb

  if (searchQuery) {
    // Realizar una solicitud de búsqueda a la API de TMDb
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Llamar a la función para mostrar los resultados
        displayResults(data.results);
      })
      .catch(err => console.error(err));
  }
}

// Agregar un evento de clic al elemento padre y delegar el clic a los botones "Detalles"
document.querySelector('#results').addEventListener('click', function(event) {
  if (event.target.classList.contains('details-button')) {
    const movieId = event.target.parentElement.getAttribute('data-movie-id');
    console.log('ID de película:', movieId);
    getMovieDetails(movieId);
  }
});

function displayResults(results) {
  const resultsContainer = document.querySelector('#results');
  resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

  results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <p>${movie.overview}</p>
      <button class="details-button">Ver Detalles</button>
    `;

    // Establecer el atributo data-movie-id en el elemento
    movieElement.setAttribute('data-movie-id', movie.id);

    resultsContainer.appendChild(movieElement);
  });
}

function getMovieDetails(movieId) {
  const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API de TMDb
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    
      console.log('URL de solicitud a la API:', url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Llamar a la función para mostrar los detalles de la película
      displayMovieDetails(data);
    })
    .catch(err => console.error(err));
}

function displayMovieDetails(movie) {
  console.log('Detalles de la película:', movie);

  const detailsContainer = document.querySelector('#movie-details');
  detailsContainer.innerHTML = '';

  const movieElement = document.createElement('div');
  movieElement.className = 'movie';
  movieElement.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
  `;

  detailsContainer.appendChild(movieElement);
  detailsContainer.classList.add('visible'); // Mostrar los detalles
}

// Mostrar el modal cuando se hace clic en un botón "Detalles"
document.querySelector('#results').addEventListener('click', function(event) {
  if (event.target.classList.contains('details-button')) {
    const movieId = event.target.parentElement.getAttribute('data-movie-id');
    getMovieDetails(movieId);
  }
});

// Cerrar el modal al hacer clic en la "X"
document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('movieModal').style.display = 'none';
});

// Mostrar el modal con los detalles de la película
function displayMovieDetails(movie) {
  const modal = document.getElementById('movieModal');
  const detailsContainer = document.getElementById('movieDetails');
  detailsContainer.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
  `;
  modal.style.display = 'block';
}
