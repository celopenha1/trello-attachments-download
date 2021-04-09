const axios          = require('axios').default,
      url            = require('../services/trelloApiUrls'),
      cardModel      = require('../models/cartoes'),
      cartoesService = require('../services/cards.services');

const nomeParaData = (nome) => {
  console.log(nome)
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
exports.executivos = async (req, res) => {
  const cardsExecutivo = await cartoesService.findByCaderno('EXECUTIVO');

  const jornais = cardsExecutivo.map((card, index) => {
    return {
      index,
      id: card.id,
      name: card.name,
      data: nomeParaData(card.name),
      labels: card.labels.map(label => label.name)
    }
  })
  res.render('materias', { jornais });

}
exports.terceiros = async (req, res) => {
  const terceiros = await cartoesService.findByCaderno('TERCEIROS');
  const jornais = terceiros.map((index, terceiro) => {
    console.log(terceiro)
    return {
      index,
      id: terceiro.id,
      nome: terceiro.name,
      data: nomeParaData(terceiro.name),
      labels: terceiro.labels.map(label => label.name)
    }
  })

  res.render('materias', { jornais });
}
exports.terceirosCasaCivil = async (req, res) => {
  const terceirosCasaCivil = await cartoesService.findByCaderno('TERCEIROS CASACIVIL');
  console.log(terceirosCasaCivil)
  const jornais = terceirosCasaCivil.map((terceiro, index) => {
    return {
      index,
      id: terceiro.id,
      name: terceiro.name,
      data: nomeParaData(terceiro.name),
      labels: terceiro.labels.map(label => label.name)
    }
  })

  res.json({ jornais })
  // res.render('materias', { jornais });
}
exports.atos = async (req, res) => {
  const atos = await cartoesService.findByCaderno('ATOS');

  const jornais = atos.map(terceiro => {
    return {
      id: terceiro.id,
      nome: terceiro.name,
      data: nomeParaData(terceiro.name)
    }
  });

  res.render('materias', { jornais });
}