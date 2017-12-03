var osmosis = require('osmosis');

let url = 'http://legislativo.camarasantos.sp.gov.br/dispositivo/ideCustom/legislativo/busca_propositura_pub/index.php?' +
  'c522f793bcf692_tipo=&c5244a91e4a4f5_sequencia=&c522f747124526_ano=&c_processo_adm=&c_ano_processo_adm=' +
  '&c522f799123a17_autoria=&local=-1&c522f7549334b2_data_i=&c522f7549334b2_data_f=&c522f756ae367a_ementa=' +
  '&busca=1&limite=2#Busca';
// $('.table tbody').find('tr').eq(2).find('td').eq(1).html();


osmosis
  .get(url)
  .find('//table')
  .set('id', 'tbody//tr[1]/td[3]')
  .set('date', 'tbody//tr[2]/td[2]')
  .set('name', 'tbody//tr[3]/td[2]')
  .set('local', 'tbody//tr[4]/td[2]')
  .set('ementa', 'tbody//tr[5]/td[2]')
  .follow('thead/tr/th/a[2]')
  .set({
    'details': [
      osmosis
        .find('//table[@id="historico_despacho"]/tbody/tr')
        .set({
          'date': 'td[1]',
          'local': 'td[2]',
          'description': 'td[3]',
        })
    ]
  })
  .data(function (listing) {
    // do something with listing data
    listing = listing;
    console.log(JSON.stringify(listing, null, 2));
  })
  .error(console.log)
  .debug(console.log)
  .log(console.log);