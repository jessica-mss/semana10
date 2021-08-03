const series = require("../models/series.json");

const getAll = (request, response) => {
    response.status(200).send(series);
};

const getById = (request, response) => {
    const requestedId = request.params.id;
    const filteredId = movies.find(movie => movie.id == requestedId);
    response.status(200).send(filteredId);
};

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase()
    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle))
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};

module.exports = {
    getAll,
    getById,
    getByTitle
}