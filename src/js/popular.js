const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API
const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'; // Ruta para obtener películas populares
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
};

const itemsPerPage = 20;
let currentPage = 1;
let totalPages = 1;

// Función para obtener datos de películas populares
async function getMovies() {
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    const movieInfoArray = loadMoviesFromLocalStorage() || [];

    // Procesar los datos y mostrar las películas
    data.results.forEach(movie => {
      const genres = [
        {
          id: 28,
          name: 'Action',
        },
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 16,
          name: 'Animation',
        },
        {
          id: 35,
          name: 'Comedy',
        },
        {
          id: 80,
          name: 'Crime',
        },
        {
          id: 99,
          name: 'Documentary',
        },
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 10751,
          name: 'Family',
        },
        {
          id: 14,
          name: 'Fantasy',
        },
        {
          id: 36,
          name: 'History',
        },
        {
          id: 27,
          name: 'Horror',
        },
        {
          id: 10402,
          name: 'Music',
        },
        {
          id: 9648,
          name: 'Mystery',
        },
        {
          id: 10749,
          name: 'Romance',
        },
        {
          id: 878,
          name: 'Science Fiction',
        },
        {
          id: 10770,
          name: 'TV Movie',
        },
        {
          id: 53,
          name: 'Thriller',
        },
        {
          id: 10752,
          name: 'War',
        },
        {
          id: 37,
          name: 'Western',
        },
      ];
      const movie_genres = movie.genre_ids
        ? movie.genre_ids.map(m => genres.find(g => g.id === m).name).join(', ')
        : [];

      const movieInfo = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote: movie.vote_count,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
        original_name: movie.original_title,
        overviwe: movie.overview,
        genres: movie_genres,
        year: movie.release_date,
      };

      let year = new Date(movie.release_date).getFullYear();
      console.log(year);

      movieInfoArray.push(movieInfo);

      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';
      movieDiv.setAttribute('data-movie-id', movie.id);

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;
      image.classList = 'movie-image';

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const overview = document.createElement('p');
      overview.textContent = `${movie_genres} | ${year}`;
      console.log(movie.year);
      overview.classList = 'genres-text';

      movieDiv.appendChild(image);
      movieDiv.appendChild(title);
      movieDiv.appendChild(overview);

      document.getElementById('movieContainer').appendChild(movieDiv);
    });

    saveMoviesToLocalStorage(movieInfoArray);
  } catch (error) {
    console.error('Error al obtener datos de la API: ', error);
  }
}

// Llamar a la función para cargar los datos de películas populares
getMovies();

function loadMoviesFromLocalStorage() {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];
  return movies;
}

function saveMoviesToLocalStorage(movies) {
  localStorage.setItem('movies', JSON.stringify(movies));
}


////////////////////
// pagination
const numberBtn = document.querySelector(".number-btn")
const next = document.querySelector(".siguiente")
const preview = document.querySelector(".anterior")

numberBtn.textContent = currentPage

next.addEventListener("click", function (){
  currentPage += 1;
})
