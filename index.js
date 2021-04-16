
const express      = require('express'),
      bodyParser   = require('body-parser'),
      app          = express();


      const trelloApi = require('./services/trelloApiUrls');
      const axios = require('axios').default;

app.use(require('./routes/index'))
app.use(require('./routes/materia.routes'));
app.use(require('./routes/attachments.routes'))

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));




app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('app rodando na porta 3000')
});


