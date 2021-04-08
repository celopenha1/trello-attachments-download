const router = require('express').Router();
const cartoesController = require('../controllers/cartoes.controller')

router.get('/executivos', cartoesController.executivos);
router.get('/terceiros', cartoesController.terceiros);
router.get('/terceiros-casacivil', cartoesController.terceirosCasaCivil);
router.get('/atos-casacivil', cartoesController.atos);


module.exports = router;