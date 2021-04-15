
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


app.get('/testando', (req, res)=>{

  axios.get(trelloApi.getActions).then(response => response.data).then(
    actions=> {
      const dadosFiltrados = actions.filter(action => action.type === 'deleteAttachmentFromCard');

      const dadosMapeados = dadosFiltrados.map(acao => {
        return {
          dataExclusao: acao.date,
          nomeUsuario: acao.memberCreator.fullName,
          nomeCartao: acao.data.card.name,
          nomeAnexo: acao.data.attachment.name
        }
      })

      res.json(dadosMapeados);
    }
  ).catch(err=> console.log(err));
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log('app rodando na porta 3000')
});


