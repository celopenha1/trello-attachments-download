const fs       = require('fs');
const https    = require('https');
const AdminZip = require('adm-zip');


const attachmentService = require('../services/attachments.services');

exports.createZipFromAttachments = async (req, res, next)=>{

  const { cardId } = req.params;

  const cardIdString = String(cardId);

  const callback = err=> err? console.log(err) : console.log(`diretório: ${cardId} foi criado com sucesso`)

  const file = new AdminZip();

  const directoryPath = `./server/${cardId}`;

  fs.existsSync(directoryPath) 
  ? console.log(`The directoy: ${cardIdString} already exists...`)
  : fs.mkdir(directoryPath, callback)

  const getAttachment = (attachment)=>{
    return new Promise ((resolve, reject)=>{

      const materia = fs.createWriteStream(`./server/${cardId}/${attachment.name}`)
      https.get(attachment.url, (response)=>{
        response.pipe(materia);
      }).on('close', ()=>{
        resolve();
      })
      .on('error', (e)=> {
        reject('error')
        console.log(e +'  oi')
      })
    })
  }


  const attachments = await attachmentService.findCardAttachments(cardId);

  let promises = attachments.map(attachment => {
    return getAttachment(attachment).then(res => res).catch(error => console.log(error))
  });

  Promise.all(promises).then( results => {
    file.addLocalFolder(directoryPath);
     file.writeZip(`${directoryPath}.zip`, (error)=> console.log(error));
     next();
  }).catch(e=> console.log(e))
}