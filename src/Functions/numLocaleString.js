

module.exports = {
    
    toDecimal: function (x){
        return x.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
}