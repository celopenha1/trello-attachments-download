const cardModel = require('../models/cartoes');
      axios     = require('axios').default,
      url       = require('./trelloApiUrls');


const findCardsFromBoard = () => axios.get(url.getCards);


exports.findByCaderno = (caderno) => {
  return findCardsFromBoard()
    .then(cards => cardModel.findByCaderno(cards.data, caderno))
}