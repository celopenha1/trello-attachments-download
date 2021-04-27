const fs = require('fs');
const https= require('https');
const AdminZip = require('adm-zip');
const axios = require('axios').default;


const attachmentService = require('../services/attachments.services');



exports.createZipFromAttachments = async (req, res, next)=>{

  const { cardId } = req.params;

  const cardIdString = String(cardId);




  const callback = err=> err? console.log(err) : console.log(`diretório: ${cardId} foi criado com sucesso`)

  const file = new AdminZip();

  const directoryPath = `./${cardId}`;

  fs.existsSync(directoryPath) 
  ? console.log('O diretório já existe')
  : fs.mkdir(directoryPath, callback)

  const getAttachment = (attachment)=>{
    console.log(attachment)

    return new Promise ((resolve, reject)=>{

      const materia = fs.createWriteStream(`./${cardId}/${attachment.name}`)
      https.get(attachment.url, (response)=>{
        response.pipe(materia);
      }).on('close', ()=>{
        resolve('oi');
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
  })

  console.log(promises)
  Promise.all(promises).then( results => {
    file.addLocalFolder(cardIdString);
     file.writeZip(`${cardIdString}.zip`, (error)=> console.log(error));
     next();
  }).catch(e=> console.log('oi'+ e))
}