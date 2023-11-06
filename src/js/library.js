const watchButton =  document.querySelector(".queryWatch")
const queueButton =  document.querySelector(".queryQueue")

watchButton.addEventListener("click", function (event){
    const watchedContainer = document.querySelector(".watched-movies")
    const watched = JSON.parse(localStorage.getItem("watchedList")) 
    if (watched && watched.length > 0) {
        console.log("nnnn")
      watchedContainer.innerHTML= "";

      watched.forEach(movie => {
        console.log(movie);                         
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
              overview.textContent = movie.genres;
              overview.classList = "genres-text";    
            
          movieDiv.appendChild(image);
          movieDiv.appendChild(title);
          movieDiv.appendChild(overview);
          watchedContainer.appendChild(movieDiv);
          });
      }
      else {
        watchedContainer.innerHTML= "";
      alert("No tiene ninguna pelicula en esta seccion")

      }
})

queueButton.addEventListener("click", function (event){
  const watchedContainer = document.querySelector(".watched-movies")
  const queue = JSON.parse(localStorage.getItem("queueList")) 
  if (queue && queue.length > 0) {
      watchedContainer.innerHTML= "";
    queue.forEach(movie => {
      console.log(movie);                         
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
            overview.textContent = movie.genres;
            overview.classList = "genres-text";    
          
        movieDiv.appendChild(image);
        movieDiv.appendChild(title);
        movieDiv.appendChild(overview);
        watchedContainer.appendChild(movieDiv);
        });
    }
    else {
      watchedContainer.innerHTML= "";
      alert("No tiene ninguna pelicula en esta seccion")
    }
})

