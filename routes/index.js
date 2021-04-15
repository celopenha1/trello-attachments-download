const express = require('express'),
       router = express.Router();

var archiver = require('archiver');
var path = require('path');

router.get('/', (req, res) => res.render('index') );


module.exports = router;