const axios = require('axios').default;

const url ='https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/65cee4c1932433ed60a2ce086342e881/EXECUTIVO_l_MAT%C3%89RIAS.png';

const urls = [
  'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/65cee4c1932433ed60a2ce086342e881/EXECUTIVO_l_MAT%C3%89RIAS.png',
  'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/65cee4c1932433ed60a2ce086342e881/EXECUTIVO_l_MAT%C3%89RIAS.png',

'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/6ed4439bf393a0ae8bcfb71ffae71436/Portarias_390%2C_391_Of._872_SES.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/82470f64d9afdd9bee40e37955efaba4/Edital_007_Resultado_Final_SECMA_Of._53.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/9e86061a1f9b1c993b60a41b2b97027a/Portaria_008_SEPE_Of._058.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/957b1c21df950213c958ef12e24bebda/Portaria_28_MAPA_Of._104.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/c45bb81da187c1028d83d14b369fde1b/Portaria_14_INMEQ_Of._107.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/92e013a28a5d1e174f5bcb3df8d1c025/Contrato_Presta%C3%A7%C3%A3o_Servi%C3%A7os_SEDUC_Of._67.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/16e859d82d8af5f195ec91ed27e63723/Edital_43_44_e_45_SEAP_Of._66.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/4547a78ed8879d007f525de58e0579f2/Pauta_Julgamento_05_SSP_Of._08.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/099c98c696a11d606a03d8e3c77d200c/Portarias_217_(%2B4)_SSP_Of._08.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/624769f76ec06dc1201f4b96f7838bce/Portaria_299_JUCEMA_Of._204.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/da2302df34d892e5f3d1168749ab2443/Resolu%C3%A7%C3%A3o_CONDEP_20_SEINC.CONDEP_Of._53.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/2229f88619b478d7f45c015f260e3701/Convoca%C3%A7%C3%A3o_Edital_04_FAPEMA_Of._291.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/2940b4b6d93428cbb50fbc4a62dace7d/Portarias_71_e_80_SEINC_Of._48.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/fe89669dd8a27895e7429f6b33d9b815/Portaria_20_STC_Of._98.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/ee8aed4efad2b1bc0141f215de5db798/Portaria_83_MOB_Of._340.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/d23e39575d9a4678d957e4b57ff5cd3c/Edital_30_Resultado_Final__SEAP_Of._67.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/e75c1c22fba2cb516efd97db892bbdec/Portarias_117_e_118_UEMASUL_Of._23.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/80c98df4bc5a9d66ca1fb0e32ca413d9/Portarias_119_120_121_122_e_123_UEMASUL_Of._25.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/20bd766edc3894f88c6a1dda0fcb7f32/Portarias_56%2C57%2C58%2C59_ITERMA_Of._205.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/52735c150efc62e0c0121bcda38cba04/Portaria_076_SECOM_of._49.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/ad4c54f8141a39f638d0b18aae8acd5d/Portaria_077_SECOM_of._49.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/1f17a014d77de7e37608b3f6251158f3/Portaria_66_SEDEL_Of._36.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/2b3c93ad67e0121f2fa748955302ffdf/Ato_Disposi%C3%A7%C3%A3o_SEGEP_Of._705.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/9e3bd789dad66700a77802c3b4702eac/Portaria_18_SEGEP_Of._704.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/27726e921160a8c7c359c90abf236a8c/Portaria_19_SEGEP_Of._708.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/b09f634bd70e1ea749281a4501e67dc8/Ato_Disposi%C3%A7%C3%A3o_SEGEP_Of._707.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/00668b88467053cde0e9c5fbc49ffac4/Portarias_870_(%2B5)_SSP_Of._09.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/bd68dd04686fc3021730e0c5766b14fc/Portaria_62_SEDIHPOP_Of._63.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/bed35833c1c3a6a315324483d92ff07a/Portaria_03_CBMMA_of._0094.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/254caa17e34fe38b27220d924410b973/Aditivos_Contratos_PS_DETRAN_of._104.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/efd66445607fbf1814b27638bda20069/Portaria_366_Of._008_DETRAN.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/5070b79b2492f1e0369d96d62e6861d3/Portaria_27_Of._009_MAPA.docx',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/7c8053d4223880c337dc63079e10085f/Atos_Elinaldo_Francisco_Brito_(%2B10)_SEDUC_Of._53.doc',
'https://trello-attachments.s3.amazonaws.com/5e77c872aafd4f367e9436d9/60815acba18cbd8ed1a09381/e967c439f1861e570e8ac5b93d12fcd7/Portarias_383_(%2B3)_SEDUC_Of._53.doc',
]

const main = async () => {

 for(i = 0; i < urls.length ; i++){

  const data1 = await (await axios.get(urls[i])).data;
   
  for(j = i+1; j < urls.length; j++){
    const data2 = await (await axios.get(urls[j])).data
    if(data1 === data2){

      console.log(`IGUAL: item ${i} é igual ao da posição ${j}`)
    }else{
      console.log(`item ${i} nao é igual a item ${j}`)
    }
  }
 }
}
main().catch(error => console.error(error));