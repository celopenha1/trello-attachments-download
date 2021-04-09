const attachmentService = require('../services/attachments.services');

exports.getAttachments = (req, res) => {
  const { cardId } = req.params;

  attachmentService.findCardAttachments(cardId).then(attachments => {

    const att = attachments.map((attachment, index) => {
      return {
        index,
        idMember: attachment.idMember,
        date: attachment.date,
        name: attachment.name,
        url: attachment.url
      }
    });

    res.render('attachments', { att })
  })
  //   fs.mkdir(`./${data.name}`, (err) => {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       console.log(`diretório: ${data.name} foi criado com sucesso`)
  //     }
  //   });
  //   attachmentData.map(attachment => {
  //     const document = fs.createWriteStream(`./${data.name}/${attachment.name}`);
  //     http.get(attachment.url, (response) => response.pipe(document));
  //   });

}
