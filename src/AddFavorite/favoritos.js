const movieWatched = JSON.parse(localStorage.getItem('watchedList'));
localStorage.setItem('watchedList', JSON.stringify(movieWatched));

const viewWatched = document.querySelector('.watched');
viewWatched.addEventListener('click', function () {
  
  console.log(movieWatched);
  console.log(movieWatched.length);
  
  // movieWatched.forEach(movie => {
  //   console.log('imprimi un id:${movie}');
  //       searchMovies(movie);

  // }
  
  // );

  // for (let i = 0; i < movieWatched.length; i++) {
  //   searchMovies(movieWatched[i]);
  //   console.log(movieWatched[i]);
  //   }
    for (const movieId of movieWatched) {
      searchMovies(movieId);
      console.log(movieId);
    }

    function searchMovies(movie) {
        
            const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

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




  function displayResults(data) {
      

  //    const detailsContainer = document.getElementById('movieDetails');
    // detailsContainer.innerHTML = 
    
        // movieContainer.innerHTML = '';
        const resultsContainer = document.getElementById('movie-details');
        resultsContainer.innerHTML = '';

                  data.forEach(movie => {


                const genres = [
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
                movieDiv.className = 'movie';

  

                const image = document.createElement('img');
                image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                image.alt = movie.title;

       
                const title = document.createElement('h2');
                title.textContent = movie.title;
       

                const overview = document.createElement('p');
                overview.textContent = movie_genres;
                overview.classList = "genres-text";
                console.log(movie_genres);

    
                movieDiv.appendChild(image);
                movieDiv.appendChild(title);
                movieDiv.appendChild(overview);

                document.getElementById('movie-details').appendChild(movieDiv);
            });
    }



});





































// // ...
//  const apiKey = '4037711053de8efe03398288380ebc9e'; // Reemplaza con tu clave de API
//  const apiUrl = 'https://api.themoviedb.org/3/account/{account_id}/favorite'; // Ruta para obtener películas populares
//  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDM3NzExMDUzZGU4ZWZlMDMzOTgyODgzODBlYmM5ZSIsInN1YiI6IjY1MzhhMmNhMGZiMTdmMDBmZWIwZTg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UxYhSmIFVn6tD_sMBEEmpjwh8WjvI_HmrbH0Ps04Qsc';


 
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     Authorization: `Bearer ${accessToken}`,
//     }

// };

// console.log("apiKey:", apiKey);
// console.log("accessToken:", accessToken);

// // Función para obtener las películas favoritas
// async function getFavoriteMovies() {
//   const favoriteUrl = `https://api.themoviedb.org/3/account/20618702/favorite/movies?api_key=${apiKey}&session_id=${accessToken}`;
  
//   try {
//     const response = await fetch(favoriteUrl, options);
//     const data = await response.json();

//     // Procesar los datos y mostrar las películas favoritas
//     data.results.forEach(movie => {
//       const movieDiv = document.createElement('div');
//       movieDiv.className = 'movie';

//       const title = document.createElement('h2');
//       title.textContent = movie.title;

//       const image = document.createElement('img');
//       image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
//       image.alt = movie.title;

//       const overview = document.createElement('p');
//       overview.textContent = movie.overview;

//       movieDiv.appendChild(title);
//       movieDiv.appendChild(image);
//       movieDiv.appendChild(overview);

//       document.getElementById('favoritesContainer').appendChild(movieDiv);
//     });
//   } catch (error) {
//     console.error('Error al obtener las películas favoritas: ', error);
//   }
// }

// // Llamar a la función para cargar las películas favoritas (en la página de Favoritos)
// if (window.location.href.includes('favoritos.html')) {
//   getFavoriteMovies();
// } else {
//   // Llamar a la función para cargar los datos de películas populares (en otras páginas)
//   getPopularMovies();
// }
