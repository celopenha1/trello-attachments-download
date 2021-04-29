const fs =                require('fs');
const https=              require('https');
const AdminZip =          require('adm-zip');
const attachmentService = require('../services/attachments.services');
// CREATING ZIP FILE FROM PATH FOLDER
exports.createZipFromAttachments = async (req, res, next)=>{
  // GET CARD ID FROM CLIENT-SIDE
  const { cardId } = req.params;
  //TRANSFORM THE VALUE ON STRING
  const cardIdString = String(cardId);
  
  const callback = err=> err? console.log(err) : console.log(`diretório: ${cardId} foi criado com sucesso`);
  
  const file = new AdminZip();

  const directoryPath = `./${cardId}`;
  // CHEF IF THE DIRECTORY ALREADY EXISTS
  fs.existsSync(directoryPath) 
  ? console.log('O diretório já existe')
  : fs.mkdir(directoryPath, callback)

  // GET ATTACHMENT BASED ON ATTACHMENT URL RECEIVE FROM TRELLO API CALLS.
  const getAttachment = (attachment)=>{
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
  // GET ALL ATTACHMENTS DATA FROM API FROM CARD-ID
  const attachments = await attachmentService.findCardAttachments(cardId);
  // CREATE A PROMISE FOR EACH ATTACHMENT TO MAKE SURE ALL OF THEM IS OK
  let promises = attachments.map(attachment => {
    return getAttachment(attachment).then(res => res).catch(error => console.log(error));
  });
  // THIS IS THE GOOD WAY TO WAITING ALL FILES TRANSFERED IN THE LOCAL FOLDER DYNAMICALLY AND
  // EXECUTE CALLBACK IN RIGHT TIME
  // WHEN ALL PROMISES ARE RESOLVED, THIS CALLBACK WILL INVOKED
  Promise.all(promises).then( results => {
    file.addLocalFolder(cardIdString);
     file.writeZip(`${cardIdString}.zip`, (error)=> console.log(error));
     next();
  }).catch(e=> console.log('oi'+ e))
}
