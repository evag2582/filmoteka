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

const addWhachedBtn = document.querySelector('.add-watched-btn')
  
addWhachedBtn.addEventListener('click', function (event) {
  console.log(event.target.parentElement.getAttribute('data-movie-id'));  
    let movieId = event.target.parentElement.getAttribute('data-movie-id')
    const movieWatched = JSON.parse(localStorage.getItem('movies'));
      if (movieWatched && Array.isArray(movieWatched)) {
     
        const foundMovie = movieWatched.find(movie => movie.id == movieId);

        addToWatched(foundMovie);

    }
  });

//--------------------------------------------------------------------


function addToQueue(movieId) {
  const queueList = JSON.parse(localStorage.getItem('queueList')) || [];

  if (queueList.includes(movieId)) {
    alert('¡Esta película ya está en tu lista de películas por ver!');
    return;
  }

  queueList.push(movieId);

  localStorage.setItem('queueList', JSON.stringify(queueList));
  alert('¡Película añadida a tu lista de películas por ver!');
}

const addQueueBtn = document.querySelector('.add-queue-btn')
  
addQueueBtn.addEventListener('click', function (event) {
  console.log(event.target.parentElement.getAttribute('data-movie-id'));  
    let movieId = event.target.parentElement.getAttribute('data-movie-id')
    const movieWatched = JSON.parse(localStorage.getItem('movies'));
      if (movieWatched && Array.isArray(movieWatched)) {
     
        const foundMovie = movieWatched.find(movie => movie.id == movieId);

        addToQueue(foundMovie);

    }
  });