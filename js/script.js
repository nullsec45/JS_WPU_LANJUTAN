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

$("#search-button").on("click", function(){
    $.ajax({
        url:"https://omdbapi.com/?apikey=438f2b3f&s="+$("#search-input").val(),
        success:results => {
            const movies=results.Search;
            let cards="";
            movies.forEach(movie => cards += showCards(movie));
            $("#movie-list").html(cards);
    
            // ketika tombol detail diklik
            $(".see-detail").on("click", function(){
                $.ajax({
                    url:"https://omdbapi.com/?apikey=438f2b3f&i="+$(this).data("imdb"),
                    success:movie => {
                        const movieDetail=showMovieDetail(movie);
                        $(".modal-body").html(movieDetail);
                    },
                    error:(e) => {
                        console.log(e.responseText);
                    }
                    
                });
            });
        },
        error:(e) => {
            console.log(e.responseText);
        }
    })    
});
