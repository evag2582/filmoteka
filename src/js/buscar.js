const apiKey = '4037711053de8efe03398288380ebc9e';
const itemsPerPage = 20; // Número de películas por página
let currentPage = 1;
let totalPages = 1; // Inicializado en 1
const paginationContainer = document.getElementById('pagination-container');

document.getElementById('searchInput').addEventListener('input', debounce(searchMovies, 300));

function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

function searchMovies() {
  const searchQuery = document.getElementById('searchInput').value;

  if (searchQuery) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    currentPage = 1;
    fetch(url, options)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(err => console.error(err));
  }
}

function displayResults(data) {
  movieContainer.innerHTML = '';

  const resultsContainer = document.getElementById('results');

  resultsContainer.innerHTML = '';

  if (data.results && data.results.length > 0) {
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
      console.log('posiblemente paso la prueba');

      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const overview = document.createElement('p');
      overview.textContent = movie_genres;
      overview.classList = 'genres-text';
      console.log(movie_genres);

      movieDiv.appendChild(image);
      movieDiv.appendChild(title);
      movieDiv.appendChild(overview);

      document.getElementById('movieContainer').appendChild(movieDiv);
    });

        function createPagination() {
      paginationContainer.innerHTML = '';

      // Calcular el rango de páginas a mostrar
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + 4);

      // Asegurarse de que haya 5 páginas en el paginador
      while (endPage - startPage < 4) {
        startPage = Math.max(1, startPage - 1);
      }

      // Botón "Anterior"
      const prevButton = document.createElement('li');
      prevButton.textContent = 'Anterior';
      prevButton.addEventListener('click', () => changePage(currentPage - 1));
      paginationContainer.appendChild(prevButton);

      // Mostrar 5 páginas en el paginador
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
      nextButton.textContent = 'Siguiente';
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
  } else {
    const inputId = document.getElementById('input-id');
    inputId.innerHTML =
      '<p class="no-results">No se encontraron resultados.</p>';
    getPopularMovies();
    currentPage = 1;
  }
}