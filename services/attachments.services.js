const apiTrello = require('./trelloApiUrls'),
      axios = require('axios').default;

exports.findCardAttachments = cardId => axios.get(apiTrello.getAttachmentsFromCard(cardId)).then(response => response.data).catch(err => console.log(err));

