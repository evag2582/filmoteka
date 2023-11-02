 const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API
 const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'; // Ruta para obtener películas populares
 const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }
};

// Función para obtener datos de películas populares
async function getPopularMovies() {
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    // Procesar los datos y mostrar las películas
    data.results.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;

      const overview = document.createElement('p');
      overview.textContent = movie.overview;

      const favoriteButton = document.createElement('button');
      favoriteButton.textContent = 'Agregar a Favoritos';
      favoriteButton.addEventListener('click', () => addToFavorites(movie.id)); // Agregar evento para agregar a favoritos

      movieDiv.appendChild(title);
      movieDiv.appendChild(image);
      movieDiv.appendChild(overview);
      movieDiv.appendChild(favoriteButton);

      document.getElementById('movieContainer').appendChild(movieDiv);
    });
  } catch (error) {
    console.error('Error al obtener datos de la API: ', error);
  }
}

// Función para agregar películas a favoritos
async function addToFavorites(movieId) {
  const favoriteUrl = `https://api.themoviedb.org/3/account/20618702/favorite?api_key=${apiKey}`;
  const favoriteData = {
    media_type: 'movie',
    media_id: movieId,
    favorite: true,
  };

  const favoriteOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(favoriteData),
  };

  try {
    const response = await fetch(favoriteUrl, favoriteOptions);
    const result = await response.json();
    if (result.status_code === 1) {
      alert('Película agregada a favoritos con éxito');
    }
  } catch (error) {
    console.error('Error al agregar película a favoritos: ', error);
  }
}

// Llamar a la función para cargar los datos de películas populares
getPopularMovies();




// ...

// Función para obtener las películas favoritas
async function getFavoriteMovies() {
  const favoriteUrl = `https://api.themoviedb.org/3/account/20618702/favorite/movies?api_key=${apiKey}&session_id=${accessToken}`;
  
  try {
    const response = await fetch(favoriteUrl, options);
    const data = await response.json();

    // Procesar los datos y mostrar las películas favoritas
    data.results.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;

      const overview = document.createElement('p');
      overview.textContent = movie.overview;

      movieDiv.appendChild(title);
      movieDiv.appendChild(image);
      movieDiv.appendChild(overview);

      document.getElementById('favoritesContainer').appendChild(movieDiv);
    });
  } catch (error) {
    console.error('Error al obtener las películas favoritas: ', error);
  }
}

// Llamar a la función para cargar las películas favoritas (en la página de Favoritos)
if (window.location.href.includes('favoritos.html')) {
  getFavoriteMovies();
} else {
  // Llamar a la función para cargar los datos de películas populares (en otras páginas)
  getPopularMovies();
}
