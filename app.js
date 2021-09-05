
const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  axios = require("axios"),
  cors = require("cors");


app.options('*', cors()) // include before other routes 
app.use(cors())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.static('public'));
app.use(require('./server/routes/index'));
app.use(require('./server/routes/materia.routes'));
app.use(require('./server/routes/attachments.routes'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './server/views');

app.use(bodyParser.urlencoded({ extended: true }));



app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`🔥🔥 application running on port ${process.env.PORT || 3000} 🔥🔥`)
});


