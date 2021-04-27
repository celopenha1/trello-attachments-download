const dotenv  = require('dotenv'),
      env     = dotenv.config().parsed,
      baseUrl = 'https://api.trello.com/1';

module.exports = {
  getCards: `${baseUrl}/boards/${process.env.TRELLO_BOARD_ID}/cards/all?${process.env.TRELLO_CREDENTIALS}`,
  getAttachmentsFromCard: (cardId) => `${baseUrl}/cards/${cardId}/attachments?${process.env.TRELLO_CREDENTIALS}`,
  getActions: `${baseUrl}/boards/${process.env.TRELLO_BOARD_ID}/actions?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&limit=1000`,
  getCardActions: `https://api.trello.com/1/cards/6063b3836aebf009ec86ae62/actions?${process.env.TRELLO_CREDENTIALS}`,
  getUser: memberId=> `https://api.trello.com/1/members/${memberId}?${process.env.TRELLO_CREDENTIALS}`
}

