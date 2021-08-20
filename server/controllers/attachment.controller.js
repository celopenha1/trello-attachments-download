const attachmentService = require('../services/attachments.services');
const fs = require('fs');
const path = require('path');
const https = require('https');
const File = require('../controllers/files.controller');
const file = new File();
const admZip = require('adm-zip');
const zipFile = new admZip();


exports.getAttachments = async (req, res) => {

  const { cardId, cardName } = req.params;

  const attachements = await attachmentService.findCardAttachments(cardId);

  const materias = attachements.map((attachment, index) => {
    return {
      index,
      idMember: attachment.idMember,
      fullDate: attachment.date,
      name: attachment.name,
      url: attachment.url
    }
  });
  res.render('attachments', { materias, cardName, cardId })
}
exports.downloadAttachments = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const attachments = await attachmentService.findCardAttachments(cardId);

    if(attachments){
      file.createFolder();
    }

    let promises = attachments.map(attachment => {

      return new Promise((resolve, reject) => {

        let materia = fs.createWriteStream(`${file.folderPath}/${attachment.name}`);


  
        const options = {
          hostname: 'trello.com',
          path: `/1/cards/${cardId}/attachments/${attachment.id}/download/${attachment.fileName}`,
          method: 'GET',
          headers: {
          'Authorization': 'OAuth oauth_consumer_key="02b8303f3c296818e1d5f30b3dd944db", oauth_token="905db66f236291d59e8285b55d53be1c98c8528dd3dcd812110f31573d09779c"'
          }
        };

        https.get(options, res => {
          res.pipe(materia);
        })
          .on('close', () => resolve(attachment.url))
          .on('error', error => reject(error))
      }).catch(error => console.error(error))
    });
    // my personal solution for verify all ended request at same time
    // and call next function after all promise are resolved!
    Promise.all(promises)
      .then(results => {
        console.log(results);
        next();
      })
      .catch(e => console.log('Erro ao baixar matérias, tente novamente', e))

  } catch (error) {
    console.log(error)
  }
}
exports.zipAttachments = (req, res, next) => {
  zipFile.addLocalFolder(file.folderPath);
  zipFile.writeZip(file.zipPath, e => console.log(e));
  next();
}
exports.sendZipFile = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',

    'Content-Disposition': 'attachment; filename=teste.zip'
  });

  var readStream = fs.createReadStream(file.zipPath);

  readStream.on("open", () => {
    readStream.pipe(res);
  });
  readStream.on("close", () => {
    file.removeFiles();
  });

}
