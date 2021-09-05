const fs = require('fs');
const path = require('path');

const admZip = require('adm-zip');
const zipFile = new admZip();

module.exports = class File {
  constructor() {
    this.folderPath = path.join(__dirname, '../', 'temp', `attachments`);
    this.zipPath = path.join(__dirname, '../', 'temp', `attachments.zip`);
  }

  createFolder() { 
    fs.mkdir(this.folderPath, error => error ? console.log(error) : console.log(`diretório criado com sucesso!`)) 
  }

  removeFiles() {
    const removeZipCallback = (error) => error ? console.log(error) : console.log('Zip deletado com sucesso!');
    const removeFolderCallback = (error) => error ? console.log(error) : console.log('Pasta deletada com sucesso');

    fs.unlink(this.zipPath, removeZipCallback);
    fs.rmdir(this.folderPath, { recursive: true }, removeFolderCallback);
  }

  zipFolderAttachments(req, res, next) {
    zipFile.addLocalFolder(this.folderPath);
    zipFile.writeZip(this.zipPath, e => console.log(e));

  }

  sendZipFile(req, res) {
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=teste.zip'
    });

    var readStream = fs.createReadStream(this.zipPath);

    readStream.on("open", () => {
      readStream.pipe(res);
    });
    readStream.on("close", () => {
      // this.removeFiles();
    });

  }


}

