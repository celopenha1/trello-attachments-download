const fs                = require('fs');
const path              = require('path');


module.exports = class File{
  constructor(){
    this.folderPath = path.join(__dirname, '../', 'temp', `attachments`);
    this.zipPath =    path.join(__dirname, '../', 'temp', `attachments.zip`);
  }

  createFolder(){ fs.mkdir(this.folderPath, error => error ? console.log(error) : console.log(`diretório criado com sucesso!`))}

  removeFiles(){
    const removeZipCallback = (error) => error ? console.log(error) : console.log('Zip deletado com sucesso!');
    const removeFolderCallback = (error) => error ? console.log(error) : console.log('Pasta deletada com sucesso');
    
    fs.unlink(this.zipPath, removeZipCallback);
    fs.rmdir(this.folderPath, { recursive: true }, removeFolderCallback);
  }

}

