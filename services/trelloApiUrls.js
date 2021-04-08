const dotenv    = require('dotenv');
const env       = dotenv.config().parsed;
const baseUrl   = 'https://api.trello.com/1';


module.exports ={
  getCards: `${baseUrl}/boards/${process.env.TRELLO_BOARD_ID}/cards?${process.env.TRELLO_CREDENTIALS}`,
  getAttachmentsFromCard: (cardId)=> `${baseUrl}/boards/${process.env.TRELLO_BOARD_ID}/cards?${process.env.TRELLO_CREDENTIALS}`,
  getActions: `${baseUrl}/boards/${process.env.TRELLO_BOARD_ID}/actions?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&limit=1000`



}
