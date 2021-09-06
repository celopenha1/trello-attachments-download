const { response } = require('express');

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

axios.default.get("https://api.trello.com/1/boards/5e77c872aafd4f367e9436d9/cards?attachments=true&key=02b8303f3c296818e1d5f30b3dd944db&token=91768320144a0d5d6c5aa2a960119e279adea3c2ef953a56399b0443c1150f28")
  .then(res=> res.data)
  .then(data => data.map(card => card.attachments))
  .then(attachments => console.log(attachments))

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`🔥🔥 application running on port ${process.env.PORT || 3000} 🔥🔥`)
});


