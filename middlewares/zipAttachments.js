const fs = require('fs');
const https= require('https');
const AdminZip = require('adm-zip');

const attachmentService = require('../services/attachments.services');


exports.createZipFromAttachments = async (req, res, next)=>{

  const { cardId } = req.params;

  const cardIdString = String(cardId)

  const callback = err=> err? console.log(err) : console.log(`diretório: ${cardId} foi criado com sucesso`)

  const file = new AdminZip();


  const directoryPath = `./${cardId}`;

  fs.existsSync(directoryPath) 
  ? console.log('O diretório já existe')
  : fs.mkdir(directoryPath, callback)

  const attachments = await attachmentService.findCardAttachments(cardId);
  
   attachments.map(attachment => {
    const materia = fs.createWriteStream(`./${cardId}/${attachment.name}`);
    https.get(attachment.url, (response) =>response.pipe(materia));
  });

  setTimeout(()=>{
    file.addLocalFolder(cardIdString, cardIdString);

    file.writeZip(`${cardIdString}.zip`);

    next();

  },12000)

  

}