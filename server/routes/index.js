module.exports = require('express').Router().get('/', (req, res)=> res.json({
    message: "Welcome to my personal implementation of trello REST- API ",
    info:{
        version: 1.0,
        Author: "Marcelo Penha Filho",
        "Created": "06-07-2021"
    }
}))