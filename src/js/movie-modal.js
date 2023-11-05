const movieApiKey = "4037711053de8efe03398288380ebc9e";

const movieContainer = document.querySelector('.movieContainer');
movieContainer.addEventListener('click', function(event) {
    console.log(event.target.parentElement)
    if (event.target.classList.contains('movie-image')) {
        const movieId = event.target.parentElement.getAttribute('data-movie-id');
        console.log('ID de película:', movieId);
        fetchMovieDetails(movieId);
        document.getElementById("myModal").style.display = "block";
    }
});

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

document.querySelector(".close").addEventListener("click", closeModal);

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

function fetchMovieDetails(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieApiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('image__movie').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById("title").innerHTML = data.title;
            document.getElementById("votes").innerHTML = ` ${data.vote_average} / ${data.vote_count}`;
            document.getElementById("popularity").innerHTML = `${data.popularity}`;
            document.getElementById("originalTitle").innerHTML = `${data.original_title}`;
            const genres = data.genres.map(genre => genre.name).join(', ');
            document.getElementById('genre').textContent = `${genres}`;
            document.getElementById("about-movie").innerHTML = data.overview;
            document.querySelector(".btns").setAttribute('data-movie-id', id);
        });
}
