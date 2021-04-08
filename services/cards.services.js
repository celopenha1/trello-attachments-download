// ARQUIVO PARA REQUISIÇÕES NA API DO TRELLO
// Autor: Marcelo Penha
const cardModel = require('../models/cartoes');
const axios     = require('axios').default;
const url       = require('./trelloApiUrls');


const findCardsFromBoard=()=> axios.get(url.getCards);


exports.findByCaderno= (caderno)=> {
  return findCardsFromBoard()
    .then(cards => cardModel.findByCaderno(cards.data, caderno))
}