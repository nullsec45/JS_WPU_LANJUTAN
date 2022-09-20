function showCards(m){
    return `
    <div class="col-md-4 my-3">
        <div class="card mb-3">
            <img src="${m.Poster}" class="card-img-top img-fluid" alt="">
            <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdb="${m.imdbID}">Show Details</a>
            </div>
        </div>
    </div>
   `;
}

function showMovieDetail(movie){
  return  `<div class="container-fluid">
                <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                    <li class="list-group-item">Released:${movie.Released}</li>
                                    <li class="list-group-item">Genre:${movie.Genre}</li>
                                    <li class="list-group-item">Director:${movie.Director}</li>
                                    <li class="list-group-item">Actors:${movie.Actors}</li>
                                    <li class="list-group-item">Writer:${movie.Writer}</li>
                                    <li class="list-group-item">Plot:${movie.Plot}</li>
                                </ul>
                            </div>
                </div>
            </div>      
            `;
}

// Fetch
const searchButton=document.querySelector("#search-button");
searchButton.addEventListener("click", async function(){
    try{
        const inputKeyword=document.querySelector("#search-input").value;
        const movies=await getMovies(inputKeyword);
        updateUI(movies);
    }catch(err){
       alert(err);
    }
});

function getMovies(keyword){
    return fetch("https://omdbapi.com/?apikey=438f2b3f&s="+keyword)
              .then(response => {
                if(!response.ok){
                    throw new Error("Unauthorized");
                }
                return response.json();
              })
              .then(response => {
                if(response.Response === "False"){
                    throw new Error(response.Error);
                }
                return response.Search
              });
  }
  
function updateUI(movies){
      let cards="";
      movies.forEach(m => cards += showCards(m));
      const movieList=document.querySelector("#movie-list");
      movieList.innerHTML=cards;
}


//event binding
document.addEventListener("click", async function(e){
    if(e.target.classList.contains("see-detail")){
        const imdbid=e.target.dataset.imdb;
        const movieDetail=await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});



function getMovieDetail(imdbid){
   return fetch("https://omdbapi.com/?apikey=438f2b3f&i="+imdbid)
    .then(response => response.json())
    .then(m => m);
}

function updateUIDetail(m){
    const movieDetail=showMovieDetail(m);
    const modalBody=document.querySelector(".modal-body");
    modalBody.innerHTML=movieDetail;
}