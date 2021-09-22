

module.exports = {
    
    toDecimal: function (x){
        return x.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    to3Decimal: function (x){
      return x.toLocaleString('en-PH', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
  }
}