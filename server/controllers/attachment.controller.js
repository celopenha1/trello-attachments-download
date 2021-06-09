
/*
author: Marcelo Penha Filho
-----------------------------------------------
sending attachments as a list based on card id
and download data from attachment's url
-----------------------------------------------
*/
const attachmentService = require('../services/attachments.services');
const fs = require('fs');
const path = require('path');

/*
  get attachments based on trello card id,
  and rendering in specific view.
*/
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
/*
  get attachments based on trello card id,
  and rendering in specific view.
*/
exports.downloadAttachments = (req, res) => {
  const { cardId } = req.params;
  const tempPath = path.join(__dirname, '../', 'temp');
  const zipPath = path.join(__dirname, '../', 'temp', `${cardId}.zip`);
  const folderPath = path.join(__dirname, '../', 'temp', `${cardId}`);

  const stat = fs.statSync(tempPath);

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; filename=materias.zip'
  });
  // send zip file to front-end via http stream.
  var readStream = fs.createReadStream(zipPath);
  readStream.pipe(res);


  const removeFiles = () => {
    const removeZipCallback = (error) => error ? console.log(error) : console.log('deletado com sucesso!');
    const removeFolderCallback = (error) => error ? console.log(error) : console.log(tempPath + 'deletada com sucesso');

    fs.unlink(zipPath, removeZipCallback);
    fs.rmdir(folderPath, { recursive: true }, removeFolderCallback);

  }
  // remove arquivos temporários após 3 segundos
  setTimeout(removeFiles, 3000);
}
