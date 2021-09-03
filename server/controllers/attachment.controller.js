const attachmentService = require('../services/attachments.services');
const fs = require('fs');
const https = require('https');
const File = require('../controllers/files.controller');
const file = new File();
const axios = require("axios").default;



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
    // FIRST: CATCH ALL ATTACHMENTS INFO FROM THE CARD
    const attachments = await attachmentService.findCardAttachments(cardId);
    // SECOND: CREATE A FOLDER CALLED  
    if (attachments) {
      file.createFolder();
      let promises = attachments.map(attachment => {

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
            .on('close', () => resolve(attachment.url))
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
  
        const allPromises = await Promise.all(promises);
  
        console.log(allPromises, "oi");

    }



  } catch (error) {
    console.log(error)
  }

}


