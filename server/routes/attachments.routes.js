const router                    = require('express').Router();
const zipMiddleware             = require('../middlewares/zipAttachments');
const cardAttachmentsController = require('../controllers/attachment.controller');

router.get(
  '/card-attachments/:cardId/:cardName', 
  cardAttachmentsController.getAttachments
);
router.get(
  '/download-materias/:cardId',
  zipMiddleware.createZipFromAttachments,  
  cardAttachmentsController.downloadAttachments
);

module.exports = router;