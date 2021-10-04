//
//
//
const fetch = require('node-fetch');

const tokenModel = require('../Models/tokenSchema');
const alertTokenModel = require('../Models/alertTokenSchema');

async function fetchTokens() {
    
    const tObj = await getCoinGData()
    
    // setUSD();

    for (var key of Object.keys(tObj)){

        //console.log(key + "->" + tObj[key])
        await tokenModel.findOneAndUpdate(
            { "tokenID" : `${key}` },
            {
                php : tObj[key].php
            },
            { 
                upsert : true,
                returnDocument: true
            }
        );
    }

    console.log(`Tokens Updated Succesfully`);
}

async function findCoin(coin) {
    
    let tokensArr = await tokenModel.find({

        nickName: { $ne:null }
    });

    if (tokensArr.includes(coin)){

        let res = tokensArr.includes(coin)
        return res
    }
    else
        return false
}

async function getBinanceData(symbol) {
    const binTkn = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
        .then(res => res.json())
    
    return binTkn
}

async function getCoinGData(){
    let cgdata = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion%2Caxie-infinity%2Cethereum%2Cplant-vs-undead-token%2Ccryptoblades%2Cweth%2Cbitcoin&vs_currencies=php')
        .then(res => res.json())

    return cgdata
}

async function setUSD() {

    const tusd = [];

    let nNameres = await tokenModel.find({
        nickName: {$ne:null}
    })
    
    for(let i = 0; i < nNameres.length; i++) {

        tusd[i] = await getBinanceData(nNameres[i].nickName.toUpperCase() + 'USDT');
        tusd[i]['nickName'] = nNameres[i].nickName;

        await tokenModel.findOneAndUpdate(
            { "nickName" : `${nNameres[i].nickName}` },
            { 
                usd : tusd[i].price,
            },
            { upsert : true }
        );
        
    }
}


module.exports = { findCoin, fetchTokens }