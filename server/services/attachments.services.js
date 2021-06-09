const apiTrello = require('./trelloApiUrls'),
  axios = require('axios').default;

// BUSCANDO TODOS OS ANEXOS DE UM CARTÃO DE ACORDO COM SEU ID.
exports.findCardAttachments = cardId =>
  axios
    .get(apiTrello.getAttachmentsFromCard(cardId))
    .then(response => response.data)
    .catch(err => console.log(err));

