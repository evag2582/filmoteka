const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API
const apiUrl = 'https://api.themoviedb.org/3/discover/movie'; // Ruta para obtener películas populares
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc'; 

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
};
    const itemsPerPage = 20; 
    let currentPage = 1;
    let totalPages = 1; 
    const movieContainer = document.getElementById("movie-container");
    const paginationContainer = document.getElementById("pagination-container");

    //obtener datos de películas desde la API
    async function getMovies(page) {
      const response = await fetch(`${apiUrl}?api_key=${apiKey}&page=${page}`);
      const data = await response.json();
      return data;
    }

    // mostrar películas en la página
    function displayMovies(movies) {
      movieContainer.innerHTML = '';

      movies.forEach(movie => {
       const   genres = [
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
       const movie_genres = movie.genre_ids ? movie.genre_ids.map(m => genres.find(g => g.id === m).name).join(", ") : [];
          console.log("posiblemente paso la prueba");
      
      const movieDiv = document.createElement('div');
      movieDiv.classList = 'movie';
      movieDiv.setAttribute('data-movie-id', movie.id);

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;
      image.classList = "movie-image"

      const title = document.createElement('h2');
      title.textContent = movie.title;
        
      const overview = document.createElement('p');
          overview.textContent = movie_genres;
          overview.classList = "genres-text";
          console.log(movie_genres);

      movieDiv.appendChild(image);
      movieDiv.appendChild(title);
      movieDiv.appendChild(overview);

      document.getElementById('movieContainer').appendChild(movieDiv);
      });
    }

    //crear la paginación
   function createPagination() {
      paginationContainer.innerHTML = '';

      //rango de páginas a mostrar
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + 4);

      // Asegurarse de que haya 5 páginas en el paginador
      while (endPage - startPage < 4) {
        startPage = Math.max(1, startPage - 1);
      }

      // Botón "Anterior"
      const prevButton = document.createElement('li');
      prevButton.textContent = '<-';
      prevButton.addEventListener('click', () => changePage(currentPage - 1));
      paginationContainer.appendChild(prevButton);

      // Mostrar 5 páginas
      for (let page = startPage; page <= endPage; page++) {
        const pageItem = document.createElement('li');
        pageItem.textContent = page;
        if (page === currentPage) {
          pageItem.classList.add('current-page');
        }
        pageItem.addEventListener('click', () => changePage(page));
        paginationContainer.appendChild(pageItem);
      }

      // Botón "Siguiente"
      const nextButton = document.createElement('li');
      nextButton.textContent = '->';
      nextButton.addEventListener('click', () => changePage(currentPage + 1));
      paginationContainer.appendChild(nextButton);
    }

    // Función para manejar el cambio de página
    function changePage(newPage) {
      if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        getMovies(currentPage)
          .then(data => {
            displayMovies(data.results);
            createPagination();
          });
      }
    }

    // Inicialización
    getMovies(currentPage)
      .then(data => {
        displayMovies(data.results);
        const totalResults = data.total_results;
        totalPages = Math.ceil(totalResults / itemsPerPage);
        createPagination();
      });

      // getMovies();

// function loadMoviesFromLocalStorage() {
//   const movies = JSON.parse(localStorage.getItem('movies')) || [];
//   return movies;
// }

// function saveMoviesToLocalStorage(movies) {
//   localStorage.setItem('movies', JSON.stringify(movies));
// }