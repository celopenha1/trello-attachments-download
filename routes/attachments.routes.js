const router = require('express').Router();
const cardAttachmentsController = require('../controllers/attachment.controller');

router.post('/card-attachments/:cardId', cardAttachmentsController.getAttachments);


module.exports = router;