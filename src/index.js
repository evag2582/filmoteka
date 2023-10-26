//Clave de la API: 4037711053de8efe03398288380ebc9e

// Token de acceso de lectura a la API:

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc

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

      movieDiv.appendChild(title);
      movieDiv.appendChild(image);
      movieDiv.appendChild(overview);

      document.getElementById('movieContainer').appendChild(movieDiv);
    });
  } catch (error) {
    console.error('Error al obtener datos de la API: ', error);
  }
}

// Llamar a la función para cargar los datos de películas populares
getPopularMovies();
