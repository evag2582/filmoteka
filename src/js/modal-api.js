document.addEventListener('DOMContentLoaded', function () {
  const apiKey = '4037711053de8efe03398288380ebc9e';

  const movieId = movie.id;

  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('title').textContent = data.title;
      document.getElementById('image__movie').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      document.getElementById('votes').textContent = `${data.vote_average} / ${data.vote_count}`;
      document.getElementById('popularity').textContent = `${data.popularity}`;
      document.getElementById('originalTitle').textContent = `${data.original_title}`;
      const genres = data.genres.map(genre => genre.name).join(', ');
      document.getElementById('genre').textContent = `${genres}`;
      document.getElementById('about-movie').textContent = data.overview;
    })
    .catch(error => {
      console.log('Error al cargar la información de la película: ' + error);
    });
});
