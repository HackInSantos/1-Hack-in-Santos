let _options;
module.exports = function (options) {
  _options = options || {};
  return {
    importSuppliers: require('./suppliers')(_options)
  }
};