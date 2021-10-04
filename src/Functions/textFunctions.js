//
//
//
const tokenModel = require('../Models/tokenSchema');

function toDecimal(x) {

    return x.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function to3Decimal(x) {
    
    return x.toLocaleString('en-PH', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
    });
}

module.exports = { to3Decimal, toDecimal };