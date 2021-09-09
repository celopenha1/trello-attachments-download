const router                    = require('express').Router();
const attachmentsController = require('../controllers/attachment.controller');
const filesController = require("../controllers/files.controller");
const fileController = new filesController();

const multer  = require('multer');
const upload = multer({});


router.get(
  '/card-attachments/:cardId/:cardName', 
  attachmentsController.getAttachments
);

router.get(
  '/download-materias/:cardId', 
  attachmentsController.downloadAttachments
);
router.post(
  "/validarEdicao", 
  upload.any(), 
  attachmentsController.validarEdicao 
);

module.exports = router;
