const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).json({
        "titulo": "To-do Api - Reprograma",
        "version": "1.0.0",
        "mensagem": "Seja bem vinda à API de tarefas"
    });
});

module.exports = router;