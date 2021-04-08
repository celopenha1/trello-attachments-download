const cartoesService = require('../services/cards.services')

const axios     = require('axios').default;
const url       = require('../services/trelloApiUrls');
const cardModel = require('../models/cartoes');

exports.executivos = async (req, res)=> {

const cardsExecutivo = await cartoesService.findByCaderno('EXECUTIVO');

console.log(cardsExecutivo.map(card=> card.name))

}


exports.terceiros = (req, res)=>{
  const terceiros = cartoesService.getCardsFromBoard('TERCEIROS');
  res.render('materias', { jornais: terceiros });
}
exports.terceirosCasaCivil = (req, res)=>{
  const terceirosCasaCivil = cartoesService.getCardsFromBoard('MATÉRIAS CASA CIVIL TERCEIROS');
    res.render('materias', { jornais: terceirosCasaCivil });
}
exports.atos = (req, res)=>{
  const atos = cartoesService.getCardsFromBoard('ATOS');
  res.render('materias', { jornais: atos });
}