
const express      = require('express'),
      bodyParser   = require('body-parser'),
      app          = express();


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


