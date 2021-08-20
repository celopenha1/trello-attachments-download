const
  attachmentService = require('../services/attachments.services'),
  AdminZip = require('adm-zip'),
  fs = require('fs'),
  https = require('https'),
  path = require('path'),
  axios = require('axios').default,
  trelloApi = require('../services/trelloApiUrls'),
  zipFile = new AdminZip();

exports.createZipFromAttachments = async (req, res, next) => {

  const { cardId } = req.params;
  const tempPath = path.join(__dirname, '../', 'temp');
  const folderAttachments = path.join(__dirname, '../', 'temp', `${cardId}`);

  if (fs.existsSync(folderAttachments)) {
    console.log('diretório já existe... ')
  } else {
    fs.mkdir(folderAttachments, error => {
      error ? console.log(error) : console.log(`diretório criado com sucesso!`)
    })
  }

  const attachments = await attachmentService.findCardAttachments(cardId);

  let promises = attachments.map(attachment => {


    return new Promise((resolve, reject) => {
      // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      let materia = fs.createWriteStream(`${tempPath}/${cardId}/${attachment.name}`);

      const options = {
        hostname: 'trello.com',
        path: `/1/cards/${cardId}/attachments/${attachment.id}/download/${attachment.fileName}`,
        method: 'GET',
        headers: {
              'Authorization': 'OAuth oauth_consumer_key="02b8303f3c296818e1d5f30b3dd944db", oauth_token="977150ae1d8a21fdbd12eb1613c2cbdc470f3da3387ddc42f0addaeca7898614"'
            }
      };
      // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      https.get(options, res => {
        res.pipe(materia);
      })
        .on('close', () => resolve(attachment.url))
        .on('error', error => reject(error))
    }).catch(error => console.error(error))
  });
  // my personal solution for verify all ended request at same time
  // and call next function after all promise are resolved!
  Promise.all(promises).then(results => {
    console.log(results)
    zipFile.addLocalFolder(folderAttachments);
    zipFile.writeZip(`${folderAttachments}.zip`, e => console.log(e));
    next();
  }).catch(e => console.log(e))
}
