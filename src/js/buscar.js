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


export function searchMovies() {
  const searchQuery = document.getElementById('searchInput').value;

  //hago la peticion de los resultados de la busqueda en api y uso funcion display
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

  const movieInfoArray = loadMoviesFromLocalStorage() || [];

  if (data.results && data.results.length > 0) {
    data.results.forEach(movie => {
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
           
          const movieInfo = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote: movie.vote_count,
            vote_average: movie.vote_average,
            popularity: movie.popularity,
            original_name: movie.original_title,
            overviwe: movie.overview,
            genres:movie_genres,
          };

          let year = (new Date(movie.release_date)).getFullYear();
          console.log(year); 
    
          movieInfoArray.push(movieInfo);

          const movieDiv = document.createElement("div");
          movieDiv.className = "movie";
          movieDiv.setAttribute('data-movie-id', movie.id);
        
        
        
          const image = document.createElement("img");
          image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          image.alt = movie.title;
          image.classList = "movie-image"
        
          const title = document.createElement('h2');
            title.textContent = movie.title;
                
          const overview = document.createElement('p');
          overview.textContent = `${movie_genres} | ${year}`;
            overview.classList = "genres-text";    
          
        
        movieDiv.appendChild(image);
        movieDiv.appendChild(title);
        movieDiv.appendChild(overview);
          
          
        
        document.getElementById('movieContainer').appendChild(movieDiv);
        });
        saveMoviesToLocalStorage(movieInfoArray);
    };
  }

  function loadMoviesFromLocalStorage() {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    return movies;
  }
  
  function saveMoviesToLocalStorage(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
  }