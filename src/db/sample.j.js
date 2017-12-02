const DB = require('./index');

const client = DB.connect();
try{
  const query = {
    text: `
    select * from somewhere
    `;,
    values: [req.params.id]
  };
  await client.query(query);

  // return data.rows.map(x => camelcaseKeys(x, {deep: true}));
  //
  // let row = data.rows[0];
  // row.customer = {
  //   name: row.name,
  //   phone: row.phone,
  // };
  // delete row.name;
  // delete row.phone;
  // row = camelcaseKeys(row);
} finally {
  client.release();
}