const router                    = require('express').Router();
const attachmentsController = require('../controllers/attachment.controller');

router.get(
  '/card-attachments/:cardId/:cardName', 
  attachmentsController.getAttachments
);

// após clicar em download, esta rotá é executada 
// executando os middlewares nesta sequência abaixo.

router.get(
  '/download-materias/:cardId', 
  attachmentsController.downloadAttachments, 
  attachmentsController.zipAttachments, 
  attachmentsController.sendZipFile
);

module.exports = router;