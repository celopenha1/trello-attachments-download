const cartoesService = require('../services/cards.services');

const nomeParaData = (nome) => {
  if (nome.split(' ')[1].split('.').length === 2) {
    return `${nome.split(' ')[1]}.2020`;
  }
  const data = nome.split(' ')[1];
  const dataSplit = data.split('.');
  const dataSlice = dataSplit.slice(0, 2);
  const dataJoin = `${dataSlice.join('.')}.2021`;

  // const dataISO = (ano)=> new Date(`${dataSlice.reverse()}.${ano}`);

  return dataJoin;
}

const transformCards = cards=> cards.map((card, index)=>{
  return {
      index,
      id: card.id,
      name: card.name,
      data: nomeParaData(card.name),
      labels: card.labels.map(label => label.name)
    }
  });

exports.executivos = async (req, res) => {
  try{
    const cardsExecutivo = await cartoesService.findByCaderno('EXECUTIVO');
    const jornais = transformCards(cardsExecutivo);
    res.render('jornais', { jornais });
  }catch(error){
    res.status(500).json({error})
  }
}
exports.terceiros = async (req, res) => {
  try{
    const cardsTerceiros = await cartoesService.findByCaderno('TERCEIROS');
    const jornais = transformCards(cardsTerceiros);
    res.render('jornais', { jornais });

  }catch(error){
    res.status(500).json({error})
  }
}

exports.terceirosCasaCivil = async (req, res) => {
  try{
    const terceirosCasaCivil = await cartoesService.findByCaderno('TERCEIROS CASACIVIL');
    const jornais = transformCards(terceirosCasaCivil);
    res.render('jornais', { jornais });
  }catch(error){
    res.status(500).json({error})

  }

}
exports.atos = async (req, res) => {
  try{
    const atos = await cartoesService.findByCaderno('ATOS');
    const jornais = transformCards(atos);
    res.render('jornais', { jornais });
  }catch(error){
    res.status(500).json({error})

  }

}