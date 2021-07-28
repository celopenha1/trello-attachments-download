# **:man: Introduction**

- If you've used **trello** before, you probably won't need to download all attachments for a particular card, unless that's part of your organization.

- In this project I implemented my personal solution for this...

- But how did I do it? The trello api only allows me to collect the urls from the attachments of a given card.

- The process consists of getting the files through their url, saving them in a directory, and then compressing this directory to send to the front as a buffer-stream.
- I used promises to ensure that all files downloaded correctly.

- here is some part of the solution

```javascript
  const promises = attachments.map(attachment => {
    return new Promise((resolve, reject) => {
      let materia = fs.createWriteStream(`${tempPath}/${cardId}/${attachment.name}`);
      https.get(attachment.url, res => res.pipe(materia))
        .on('close', () => resolve(attachment.name))
        .on('error', error => reject(error))
    }).catch(error => console.error(error))
  });
  // solution for verify all ended request at same time
  // and end middleware, and call the next function after all promise are resolved!
  Promise.all(promises).then(results => {
    console.log(results)
    zipFile.addLocalFolder(folderAttachments);
    zipFile.writeZip(`${folderAttachments}.zip`, e => console.log(e));
    next();
  }).catch(e => console.log(e))
}
```

[![example](https://i.imgur.com/4dNCi95.png "example")](https://i.imgur.com/4dNCi95.png "example")

### Tecnologies
- NodeJS
- Express
- adm-zip
- Axios
- EJS ( javascript template engine)

@Author: Marcelo Penha Filho

