//Clave de la API: 4037711053de8efe03398288380ebc9e

// Token de acceso de lectura a la API:

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc

// JavaScript

const apiKey = '4037711053de8efe03398288380ebc9e';

function addToWatched(movieId) {
  const watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];

  if (watchedList.includes(movieId)) {
    alert('¡Esta película ya está en tu lista de películas vistas!');
    return;
  }

  watchedList.push(movieId);

  localStorage.setItem('watchedList', JSON.stringify(watchedList));
  alert('¡Película añadida a tu lista de películas vistas!');
}

document
  .getElementById('add-to-watched')
  .addEventListener('click', function () {
    const movieId = 12345; // Reemplazar 12345 con el ID de la película real

    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    fetch(movieUrl)
      .then(response => response.json())
      .then(data => {
        addToWatched(movieId);
      })
      .catch(error => {
        console.error('Error al obtener la información de la película:', error);
      });
  });

//--------------------------------------------------------------------

const API_KEY = '4037711053de8efe03398288380ebc9e';

const MOVIE_ID = 12345;

const addButton = document.getElementById('add-to-queue');
const movieList = document.getElementById('movie-list');

function addToQueue() {
  fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const movie = {
        id: data.id,
        title: data.title,
        release_date: data.release_date,
      };

      let queue = JSON.parse(localStorage.getItem('movieQueue')) || [];
      queue.push(movie);

      localStorage.setItem('movieQueue', JSON.stringify(queue));

      updateMovieList(queue);
    })
    .catch(error =>
      console.error('Error al agregar la película a la cola:', error)
    );
}

function updateMovieList(queue) {
  movieList.innerHTML = '';
  queue.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.textContent = `${movie.title} (${movie.release_date})`;
    movieList.appendChild(listItem);
  });
}

addButton.addEventListener('click', addToQueue);

const queue = JSON.parse(localStorage.getItem('movieQueue')) || [];
updateMovieList(queue);
