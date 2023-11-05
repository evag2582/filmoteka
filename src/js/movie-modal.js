const movieApiKey = "4037711053de8efe03398288380ebc9e";

const movieContainer = document.querySelector('.movieContainer')
movieContainer.addEventListener('click', function(event) {
    console.log(event.target.parentElement)
    if (event.target.classList.contains('movie-image')) {
      const movieId = event.target.parentElement.getAttribute('data-movie-id');
      console.log('ID de película:', movieId);
      fetchMovieDetails(movieId);
    }
    document.getElementById("myModal").style.display = "block";
  });


  function fetchMovieDetails(id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieApiKey}`)
          .then(response => response.json())
          .then(data => {
              document.getElementById('image__movie').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
              document.getElementById("modalTitle").innerHTML = data.title;
              document.getElementById("modalDescription").innerHTML = data.overview;
              document.getElementById("modalRating").innerHTML = `votes: ${data.vote_average} / ${data.vote_count}`;
              document.getElementById("modalPopularity").innerHTML = `Popularity: ${data.popularity}`;
              document.querySelector(".btns").setAttribute('data-movie-id', id)
                      });
  }

  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});