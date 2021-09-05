//node api 
const fs = require('fs');
const https = require('https');
// libs
const superagent = require("superagent")
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
// files
const attachmentService = require('../services/attachments.services');
const File = require('../controllers/files.controller');
const file = new File();

exports.getAttachments = async (req, res) => {
  const { cardId, cardName } = req.params;

  try {
    const attachements = await attachmentService.findCardAttachments(cardId);
    const qntMaterias = attachements.length - 1;
    attachements.shift()
    const materias = attachements.map((attachment, index) => {
      return {
        index: index + 1,
        idMember: attachment.idMember,
        fullDate: attachment.date,
        name: attachment.name,
        url: attachment.url
      }
    });

    const attachmentText = attachements.map(async attachment => {
      const response = await superagent.get(attachment.url)
        .set("Authorization", "OAuth oauth_consumer_key=\"02b8303f3c296818e1d5f30b3dd944db\", oauth_token=\"91768320144a0d5d6c5aa2a960119e279adea3c2ef953a56399b0443c1150f28\"")
        .parse(superagent.parse.image)
        .buffer();

      const buffer = response.body;
      const textExtract = await extractor.extract(buffer);
      const extractProcess = textExtract.getBody().replace(/\s+/g, ' ').trim();
      let sanitizeText = extractProcess.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\-]+/g, ' ');
      
      return {
        nome: attachment.name,
        conteudo: extractProcess
      }
    });

    const conteudoMaterias = await Promise.all(attachmentText.map(async val => {
      return val
    }));
    res.render('attachments', { materias, cardName, cardId, qntMaterias, conteudoMaterias })
  } catch (error) {
    res.status(500).json({message:"erro na sua solicitação", error})
  }


  
}

exports.downloadAttachments = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const attachments = await attachmentService.findCardAttachments(cardId);

    console.log(attachments);
    // SECOND: CREATE A FOLDER CALLED  
    if (attachments) {
      file.createFolder();
      let promises = attachments.map(attachment => {

        console.log(attachment)
        return new Promise((resolve, reject) => {

          let materia = fs.createWriteStream(`${file.folderPath}/${attachment.name}`);

          const options = {
            hostname: 'trello.com',
            path: `/1/cards/${cardId}/attachments/${attachment.id}/download/${attachment.fileName}`,
            method: 'GET',
            headers: {
              "Authorization": "OAuth oauth_consumer_key=\"02b8303f3c296818e1d5f30b3dd944db\", oauth_token=\"91768320144a0d5d6c5aa2a960119e279adea3c2ef953a56399b0443c1150f28\""
            }
          };
          https.get(options, res => {
            res.pipe(materia);
          })
            .on('close', () => res.statusCode === 200 ? resolve(`Arquivo: ${attachment.name} baixado com sucesso`) : reject("Matéria não pôde ser baixada"))
            .on('error', error => reject(error))
        }).catch(error => console.error(error))
      });
      // my personal solution for verify all ended request at same time
      // and call next function after all promise are resolved!
      Promise.all(promises)
        .then(results => {
          file.zipFolderAttachments();
          file.sendZipFile(req, res);
          file.removeFiles();
        })
        .catch(e => console.log('Erro ao baixar matérias, tente novamente', e));
    }
  } catch (error) {
    console.log(error)
  }

}

exports.validarEdicao = async(request, response)=>{
  const { conteudoMaterias } = request.body;
  const { pdf } = request.files;

  console.log(request.body);
  console.log(request.files);

  console.log(request)

  response.json({
    body: request.body,
    file: request.files
  });
}
