const movieApiKey = "4037711053de8efe03398288380ebc9e";

const movieContainer = document.querySelector('.movieContainer')
movieContainer.addEventListener('click', function(event) {
    console.log(event.target.parentElement)
    if (event.target.classList.contains('movie-image')) {
      const movieId = event.target.parentElement.getAttribute('data-movie-id');
      console.log('ID de película:', movieId);
        const movieWatched = JSON.parse(localStorage.getItem('movies'));
        if (movieWatched && Array.isArray(movieWatched)) {
     
            const foundMovie = movieWatched.find(movie => movie.id == movieId);
            console.log(foundMovie);
            document.getElementById('image__movie').src = `https://image.tmdb.org/t/p/w500${foundMovie.poster_path}`;
            document.getElementById("title").innerHTML = foundMovie.title;
            document.getElementById("votes").innerHTML = ` ${foundMovie.vote_average} / ${foundMovie.vote}`;
            document.getElementById("popularity").innerHTML = `${foundMovie.popularity}`;
            document.getElementById("originalTitle").innerHTML = `${foundMovie.original_name}`;
            document.getElementById('genre').textContent = `${foundMovie.genres}`;
            document.getElementById("about-movie").innerHTML = foundMovie.overviwe;
            document.querySelector(".btns").setAttribute('data-movie-id', foundMovie.id)

    }
    document.getElementById("myModal").style.display = "block";
  }});



  function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

