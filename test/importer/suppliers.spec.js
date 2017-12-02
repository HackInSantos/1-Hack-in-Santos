const chai = require('chai');
chai.should();

const Importer = require('../../src/importer')();

describe('Suppliers', function () {
  it('Interpret Suppliers Data from CSV', async function () {
    return Importer
      .importSuppliers({file: 'src/datasource/DespesasporFornecedor_2017_1419.csv'})
      .then(function (csvData) {
        csvData.should.be.an('Array');
        csvData[0].should.have.property('id');
        csvData[0].should.have.property('supplier');
        csvData[0].should.have.property('supplierId');
        csvData[0].should.have.property('estimatedBudget');
        csvData[0].should.have.property('liquadatedBudget');
        csvData[0].should.have.property('paidBuget');
      });
  });
});