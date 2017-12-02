const _ = require('lodash');
let parse = require('csv-parse/lib/sync');
const fs = require('fs');
const util = require('util');
// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

module.exports = function () {
  return async function (options) {
    options = options || {};
    if (!options.file)
      throw new Error('Property file is needed');
    let data = await readFile(options.file, 'utf-8');
    let parsedData = parse(data, {delimiter: ';'});
    let mappedData = _.map(parsedData, function (data) {
      return {
        id: data[0],
        supplier: data[1],
        supplierId: data[2],
        estimatedBudget: data[3],
        liquadatedBudget: data[4],
        paidBuget: data[5],
      }
    });
    return mappedData;
  };
};