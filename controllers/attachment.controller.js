const attachmentService = require('../services/attachments.services');
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const users = require('../dataset/users');


exports.getAttachments = async (req, res) => {

  const { cardId, cardName } = req.params;
  console.log(req.params)
  console.log(cardName)

  const attachements = await attachmentService.findCardAttachments(cardId);

  const materias = attachements.map((attachment, index) =>{
    return {
      index,
      idMember: attachment.idMember,
      fullDate:attachment.date,
      name: attachment.name,
      url: attachment.url
    }
  });
  res.render('attachments', { materias, cardName, cardId })
}




exports.downloadAttachments =  (req, res)=>{
  const {cardId} = req.params
  const zipPath = path.join(__dirname,`../${cardId}.zip`);
  const folderPath = path.join(__dirname,`../${cardId}`);
  console.log(folderPath)
  console.log(zipPath);
  const stat = fs.statSync(zipPath);
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size,
        'Content-Disposition': 'attachment; filename=teste.zip'
  })
  var readStream = fs.createReadStream(zipPath);
  readStream.pipe(res);

  setTimeout(()=>{

    const callback = (error) => !error? console.log(error) : console.log('deletado com sucesso!');

    fs.unlink(zipPath, callback);


    fs.rmdir(folderPath, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }
  
      console.log(`${folderPath} is deleted!`);
  });



  }, 5000)
}
