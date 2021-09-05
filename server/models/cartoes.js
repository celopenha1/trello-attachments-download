
exports.findByCaderno = (cards, caderno) =>{
  
  
  switch (caderno) {
    case 'EXECUTIVO':
      return cards.filter(card => card.name.match(/EXECUTIVO \d{2}.\d{2}(.\d{2})? l MATÉRIAS/g))
    case 'TERCEIROS':
      return cards.filter(card => card.name.match(/TERCEIROS \d{2}.\d{2}(.\d{2})? l MATÉRIAS/g))
    case 'ATOS':
      return cards.filter(card => card.name.match('ATOS CASA CIVIL'))
    case 'TERCEIROS CASACIVIL':
      return cards.filter(card => card.name.match('MATÉRIAS CASA CIVIL TERCEIROS'))
    default:
      break;
  }
}