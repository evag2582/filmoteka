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
      console.log(data);
      console.log("revise la info de la api")
      displayMovieDetails(data);
    })
    .catch(err => console.error(err));
}

// Cerrar el modal al hacer clic en la "X"
document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('movieModal').style.display = 'none';
});

// Mostrar el modal con los detalles de la película
function displayMovieDetails(movie) {

 const   genresM = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }];
  
  // const movie_genres = movie.genre_ids.map(m => genres.find(g => g.id === m).name);

// const movie_genres = movie.genres ? movie.genres.map(m => genresM.find(g => g.id === m).name) : [];
const movie_genres = movie.genres ? movie.genres.map(genre => genre.name) : [];

  const modal = document.getElementById('movieModal');
  const detailsContainer = document.getElementById('movieDetails');
  detailsContainer.innerHTML = `
  <div class="dos">
    <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title}">
   </div>

  <div class="uno">
    <h2>${movie.title}</h2>
    
     <p>Vote/Vote: ${movie.vote_count} / ${movie.vote_average}</p>
    <p>Calificación promedio: ${movie.vote_average}</p>
  <p>Géneros:${movie_genres} </p>
    
     </div>
     
   `;
  modal.style.display = 'block';
}


