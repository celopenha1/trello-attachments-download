let express = require('express'),
       router = express.Router();


       let env  = require('dotenv').config().parsed;
       let axios = require('axios').default;
       
        let getCardActions = `https://api.trello.com/1/cards/60421a99552dc85025f453c5/actions?${process.env.TRELLO_CREDENTIALS}&filter=addAttachmentToCard`
       
       let url = `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/lists?${process.env.TRELLO_CREDENTIALS}&name=executivo-teste&pos=41719432`;
       let getLists = `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/lists?${process.env.TRELLO_CREDENTIALS}`;
       let urlCreateCard = `https://api.trello.com/1/cards?${process.env.TRELLO_CREDENTIALS}`;
       let urlAttachment = (id)=> `https://api.trello.com/1/cards/${id}/attachments?${process.env.TRELLO_CREDENTIALS}`;

       let urlCoverExecutivo = 'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60787e4dba1ece0f6da04d77/250x85/eeacafa30e95247f0fae1132c28c6efa/JORNAL__282_29.png';
       let urlCoverTerceiros = 'https://trello-attachments.s3.amazonaws.com/606f14ecfb0f2077c1e6f877/250x85/8ba0c19e426c902011d0039a0e8b85db/TERCEIROS_l_MAT%C3%89RIAS.png'

router.get('/', (req, res) => res.render('index') );

router.get('/testando', async (req, res)=>{

  let toDate = {
    lista: (index, mes)=>{

      let diaStr = String(index).length > 1 ? String(index) : '0'+String(index);
      let mesStr = String(mes).length > 1 ? String(mes) : '0'+String(mes);
      let date = new Date();
      let ano = String(date.getFullYear()).slice(2);
  
      return `(${diaStr}/${mesStr}/${ano})`;
    },
    cartao: (index, mes, caderno)=>{

      let diaStr = String(index).length > 1 ? String(index) : '0'+String(index);
      let mesStr = String(mes).length > 1 ? String(mes) : '0'+String(mes);
      let date = new Date();
      let ano = String(date.getFullYear()).slice(2);
  
      return `${diaStr}.${mesStr}.${ano}`;
    }
  }


  //CRIANDO UMA LISTA

  let criarListas = async (inicio, fim, mes)=>{




    for(let i = inicio; i <= fim; i++){

      let lists = (await axios.get(getLists)).data;
      let lastList = lists[lists.length -1];
      let lastListPosition = lastList.pos;


      let createListExecutivo = (await axios.post(url, {name: `${toDate.lista(i, mes)} EXECUTIVO`, pos: lastListPosition + 1})).data;
      let idListExecutivo = createListExecutivo.id;
      // CRIANDO CARTÃO DE MATÉRIAS
      let cardMateriasExecutivo = (await axios.post(urlCreateCard, {name: `EXECUTIVO ${toDate.cartao(i, mes)} l MATÉRIAS `, idList:idListExecutivo})).data;
      let cardExecId = cardMateriasExecutivo.id;
      let addCoverExec = (await axios.post(urlAttachment(cardExecId), {url: urlCoverExecutivo, setCover: true})).data;

      let cardAtosExecutivo = (await axios.post(urlCreateCard, {name:`ATOS CASA CIVIL ${toDate.cartao(i, mes)}`, idList:idListExecutivo, idLabels:["5e77c8727669b22549eae52a"]})).data;
      let cardMapaExecutivo = (await axios.post(urlCreateCard, {name:`MAPA EXECUTIVO ${toDate.cartao(i, mes)}`, idList:idListExecutivo, desc:'[LINK]( ) de acesso ao mapa'})).data;



      let createListTerceiros = (await axios.post(url, {name: `${toDate.lista(i, mes)} TERCEIROS`, pos: createListExecutivo.pos + 1})).data;
      let idListTerceiros = createListTerceiros.id;
      // CRIANDO CARTÃO DE MATÉRIAS
      let cardMateriasTe = (await axios.post(urlCreateCard, {name: `TERCEIROS ${toDate.cartao(i, mes)} l MATÉRIAS `, idList:idListTerceiros})).data;
      let cardTeId = cardMateriasTe.id;
      let addCoverTe = (await axios.post(urlAttachment(cardTeId), {url: urlCoverTerceiros, setCover: true})).data;

      let cardMateriasCasaCivil = (await axios.post(urlCreateCard, {name:`MATÉRIAS CASA CIVIL TERCEIROS ${toDate.cartao(i, mes)}`, idList:idListTerceiros, idLabels:["5e77c8727669b22549eae52a"]})).data;
      let cardCapaEmailTe = (await axios.post(urlCreateCard, {name:`CAPA DE E-MAIL TERCEIROS ${toDate.cartao(i, mes)}`, idList:idListTerceiros})).data;
      let cardMapaTerceiros = (await axios.post(urlCreateCard, {name:`MAPA TERCEIROS ${toDate.cartao(i, mes)}`, idList:idListTerceiros, desc:'[LINK]( ) de acesso ao mapa'})).data;


    }
  }

  // insira a data inicial, data final e o numero do mes para gerar os cartões executivo e terceiros automaticamente no quadro do trello.

  criarListas(20,30, '6')





  // let createList = (caderno)=>{
  //   createCardCover(caderno);
  //   createCardMaterias(caderno);
  //   createCardMapa(caderno);

  //   if(caderno === 'EXECUTIVO'){

  //   }
  //   if(caderno ==='TERCEIROS'){

  //   }
  // }



  // let config = {url: url, method: 'POST', data:{name: 'EXECUTIVO TESTANDO', pos: (data[data.length - 1].pos) + 1 } }

  // let resListCreate = await axios.post(url, {  })

  // let list = await resListCreate.data;

  // console.log(list.idList);

  // axios.get(getLists).then(result => result.data).then(data =>{
  //   axios().then(response => response.data).then(data =>{

  //       axios({
  //         method: 'POST',
  //         url: urlCreateCard,
  //         data: {
  //           name: 'EXECUTIVO TESTANDO NOVAMENTE',
  //           idList: data.id,
  //         }
  //       }).then(res => res.data).then(data=>{
  //         axios({
  //           method: 'POST',
  //           url: urlAttachment(data.id),
  //           data:{
  //             url: 'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60787e4dba1ece0f6da04d77/250x85/eeacafa30e95247f0fae1132c28c6efa/JORNAL__282_29.png',
  //             setCover: true
  //           }
  //         })
  //       }).catch(error=> console.log(error))

  //       axios({
  //         method: 'POST',
  //         url: urlCreateCard,
  //         data:{
  //           name: 'MAPA EXECUTIVO',
  //           idList: data.id
  //         }
  //       }).catch(err=> console.log(err))


  //     })
  // });


  res.end()
});


router.get('/teste2', (req, res)=>{

  axios.get(getCardActions).then(response => response.data).then(datas => datas.map(action=> action.memberCreator.fullName))
  .then(result => res.json({result:result}))
  .catch(err=> console.log(err));
})



module.exports = router;