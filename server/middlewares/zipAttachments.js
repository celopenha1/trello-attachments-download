const
  attachmentService = require('../services/attachments.services'),
  AdminZip = require('adm-zip'),
  fs = require('fs'),
  https = require('https'),
  path = require('path'),
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

      let materia = fs.createWriteStream(`${tempPath}/${cardId}/${attachment.name}`);

      https.get(attachment.url, res => res.pipe(materia))
        .on('close', () => resolve(attachment.name))
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
