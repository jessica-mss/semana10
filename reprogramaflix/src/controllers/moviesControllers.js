const movies = require("../models/filmes.json")

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    const requestedId = request.params.id;
    const filteredId = movies.find(movie => movie.id == requestedId);
    response.status(200).send(filteredId);
}

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase()

    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))

    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};

const getByGenre = (request, response) => {
    const requestedGenre = request.query.genre;
    let movieList = [];

    movies.forEach(movie => {
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        }

    })
    response.status(200).send(movieList)
}

const createMovie = (req, res) => {
    let requestedTitle = req.body.title
    let requestedYear = req.body.year
    let requestedRated = req.body.rated
    let requestedReleased = req.body.released
    let requestedRuntime = req.body.runtime
    let requestedGenre = req.body.genre
    let requestedDirector = req.body.director
    let requestedWriter = req.body.writer
    let requestedActors = req.body.actors
    let requestedPlot = req.body.plot
    let requestedLanguage = req.body.language
    let requestedCountry = req.body.country
    let requestedAwards = req.body.awards

    console.log(req.body);

    let newMovie = {
        "id": Math.random().toString(32).substr(2, 6),
        "title": requestedTitle,
        "year": requestedYear,
        "rated": requestedRated,
        "released": requestedReleased,
        "runtime": requestedRuntime,
        "genre": requestedGenre,
        "director": requestedDirector,
        "writer": requestedWriter,
        "actors": requestedActors,
        "plot": requestedPlot,
        "language": requestedLanguage,
        "country": requestedCountry,
        "awards": requestedAwards
    };

    movies.push(newMovie);

    res.status(201).send({
        "message": "Filme criado com sucesso",
        newMovie
    });
}

const deleteMovie = (request, response) => {
    const requiredId = request.params.id;
    const filteredMovie = movies.find(filme => filme.id == requiredId);

    const indice = movies.indexOf(filteredMovie);
    movies.splice(indice, 1);

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        movies
    }]);

};


const replaceMovie = (req, res) => {
    let requestedId = req.params.id;
    let filmeFromBody = req.body;

    let filteredMovie = movies.find(filme => filme.id == requestedId);

    let updateMovie = {
        "id": filteredMovie.id,
        "title": filmeFromBody.title,
        "year": filmeFromBody.year,
        "rated": filmeFromBody.rated,
        "released": filmeFromBody.released,
        "runtime": filmeFromBody.runtime,
        "genre": filmeFromBody.genre,
        "director": filmeFromBody.director,
        "writer": filmeFromBody.writer,
        "actors": filmeFromBody.actors,
        "plot": filmeFromBody.plot,
        "language": filmeFromBody.language,
        "country": filmeFromBody.country,
        "awards": filmeFromBody.awards
    }

    const indice = movies.indexOf(filteredMovie);

    movies.splice(indice, 1, updateMovie);

    res.status(200).send({
        "mensagem": "Filme substituido com sucesso ",
        updateMovie
    })
};

const updateTitle = (req, res) => {
    let requestedId = req.params.id;
    let newTitle = req.body.title;
    let filteredMovie = movies.find(filme => filme.id == requestedId);
    filteredMovie.title = newTitle;

    res.status(200).send({
        "mensagem": "Titulo atualizado com sucesso",
        filteredMovie
    });
};

const updateAnything = (req, res) => {
    let requestedId = req.params.id;
    console.log("ID", requestedId);

    let filteredMovie = movies.find(filme => filme.id == requestedId);
    console.log("Post filtrado", filteredMovie);

    let updateMovie = req.body;
    console.log("informações do body", updateMovie);

    let keyList = Object.keys(updateMovie)
    console.log(keyList);

    movies[1] 


    keyList.forEach((chave) => {
        console.log('chave', chave);
        filteredMovie[chave] = updateMovie[chave]
    });

    res.status(200).send({
        "message": "Filme atualizado",
        filteredMovie
    })

};


module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createMovie,
    deleteMovie,
    replaceMovie,
    updateTitle,
    updateAnything
}
