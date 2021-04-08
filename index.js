'use strict'
const fs          = require('fs')
const Path        = require('path')
const Axios       = require('axios').default;
const express     = require('express');
const bodyParser  = require('body-parser')
const app        = express();

const dotenv    = require('dotenv');
const env       = dotenv.config().parsed;
const baseUrl   = 'https://api.trello.com/1';


const urls = require('./services/trelloApiUrls')

app.use(require('./routes/materia.routes'))

app.use(require('./routes/index'))

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, (req, res) => {
  console.log('app rodando na porta 3000')
});

app.post('/card-attachments/:cardId', (req, res) => {

  const { cardId } = req.params;
  console.log(cardId);

  trello.get(`1/cards/${cardId}/attachments`, (err, attachmentData) => {
    if (err) {
      res.json(err)
    }

    console.log(attachmentData)

    const attachmentData2 = attachmentData.map(att => {
      return {
        nome: att.name
      }
    })
    res.render('attachments', { attachments: attachmentData2 })

    // t.get('1/boards/5e77c872aafd4f367e9436d9/cards/6063b153784c993636adc463/', (err, data) => {

    //   fs.mkdir(`./${data.name}`, (err) => {
    //     if (err) {
    //       console.log(err)
    //     }
    //     else {
    //       console.log(`diretório: ${data.name} foi criado com sucesso`)
    //     }
    //   });
    //   attachmentData.map(attachment => {
    //     const document = fs.createWriteStream(`./${data.name}/${attachment.name}`);
    //     http.get(attachment.url, (response) => response.pipe(document));
    //   });
    // })
  });


})



app.get('/mapas', async (req, res) => {


  // t.get('1/boards/5e77c872aafd4f367e9436d9/cards', (err, data) => {
  //   console.log(data.map(item => item.name).filter(nome => nome.match('ATOS')))
  //   res.json({ data })
  // })



});



// ROTA PARA ENVIAR A LISTA DE TODOS OS CARTÕES NO QUADRO
// AO CLICAR EM UMA LISTA, FAZER UMA REQUISIÇÃO PARA 



const http = require('https')

// async function downloadImage() {

// Fs.mkdir(`./${new Date()}`, (err) => {
//   if (err)
//     console.log(err)
//   console.log('diretorio criado')
// });


// trello.get('1/cards/6063b153784c993636adc463/attachments', (err, attachmentData) => {

//   trello.get('1/boards/5e77c872aafd4f367e9436d9/cards/6063b153784c993636adc463/', (err, data) => {
//     fs.mkdir(`./${data.name}`, (err) => {
//       if (err) {
//         console.log(err)
//       }
//       else {
//         console.log(`diretório: ${data.name} foi criado com sucesso`)
//       }
//     });
//     attachmentData.map(attachment => {
//       const document = fs.createWriteStream(`./${data.name}/${attachment.name}`);
//       http.get(attachment.url, (response) => response.pipe(document));
//     });
//   })
// });

