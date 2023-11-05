const apiKey = '4037711053de8efe03398288380ebc9e';

document
  .getElementById('searchInput')
  .addEventListener('input', debounce(searchMovies, 300));

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
      const movieTitle = movie.title;
      const movieOverview = movie.overview;
      const moviePoster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
        : 'no-image-available.jpg';

      const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        
      movieElement.innerHTML = `
        <h2>${movieTitle}</h2>
        <p>${movieOverview}</p>
        <img src="${moviePoster}" alt="${movieTitle}">
      `;

      resultsContainer.appendChild(movieElement);
    });
  } else {
    resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
  }
}
