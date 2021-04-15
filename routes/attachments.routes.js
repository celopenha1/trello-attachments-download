const router = require('express').Router();

const cardAttachmentsController = require('../controllers/attachment.controller');
const mid = require('../middlewares/zipAttachments');

router.get('/card-attachments/:cardId/:cardName', cardAttachmentsController.getAttachments);

router.get(
  '/download-materias/:cardId',
  mid.createZipFromAttachments,  
  cardAttachmentsController.downloadAttachments
);

module.exports = router;