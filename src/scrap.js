const DB = require('./db');
const osmosis = require('osmosis');
const crypto = require('crypto');
const moment = require('moment');
const hash = require('object-hash');

let url = 'http://legislativo.camarasantos.sp.gov.br/dispositivo/ideCustom/legislativo/busca_propositura_pub/index.php?' +
  'c522f793bcf692_tipo=&c5244a91e4a4f5_sequencia=&c522f747124526_ano=&c_processo_adm=&c_ano_processo_adm=' +
  '&c522f799123a17_autoria=&local=-1&c522f7549334b2_data_i=&c522f7549334b2_data_f=&c522f756ae367a_ementa=' +
  '&busca=1&limite=2#Busca';
// $('.table tbody').find('tr').eq(2).find('td').eq(1).html();

let count = 0;
(async function () {
  let client = await DB.connect();
  try {
    await osmosis
      .get(url)
      .paginate('a:starts-with("Próximo")')
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
            .then(function (context, data, next, done) {
              data.date = data.date.replace('\n\t\t\t', '');
              data.date = moment(data.date, 'DD/MM/YYYYHH:mm:ss').toDate();
              next(context, data);
              done();
            })
        ]
      })
      .data(function (listing) {
        try {
          save(listing);
        } catch (err) {
          console.log('[SAVING]', err.stack);
          osmosis.stop();
        }
      })
      .error(console.log)
    // .debug(console.log)
    // .log(console.log)
    ;
  } finally {
    console.log('Scrap Finished');
    client.release();
  }

  async function save(data) {
    if (count == 2)
      throw Error('FUCK THE FUCK');
    count++;
    data.aldermen_id = crypto.createHash('md5').update(data.name).digest("hex");
    let query = {
      text: `
      insert into aldermen (id, name) values ($1, $2) 
      --ON CONFLICT DO NOTHING
      `,
      values: [
        data.aldermen_id
        , data.name
      ]
    };
    try {
      await client.query(query);
    } catch (err) {
      // err
      console.log('[INSERT ALDERMAN]', err);
    }

    data.date = moment(data.date, "DD/MM/YYYY").toDate();
    data.projectId = hash(data);
    // Save Project
    query = {
      text: `
      insert into projects (id, hash_id, date, local, ementa, details, aldermen_id) 
      values ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [
        data.id
        , data.projectId
        , data.date
        , data.local
        , data.ementa
        , JSON.stringify(data.details)
        , data.aldermen_id
      ]
    };
    try {
      await client.query(query);
    } catch (err) {
      // err
      console.log('[INSERT PROJECT]', JSON.stringify(data.details, null, 2), err);
    }
  }
})();
