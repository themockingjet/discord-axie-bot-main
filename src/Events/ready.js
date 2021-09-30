//
//
//
const Event = require("../Structures/Event.js");
const fetch = require('node-fetch');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Event("ready", client => {
	console.log("Bot is ready!");
	
	client.channels.fetch('892482366596071425')
		.then(channel => {
			channel.send(`${client.user} is online.`)
		})

	fetchTokens();

	setInterval(() => {
			fetchTokens();
		},
		//2 minutes
		60000
	);

	async function fetchTokens() {
		const tObj = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion%2Caxie-infinity%2Cethereum%2Cplant-vs-undead-token%2Ccryptoblades%2Cweth%2Cbitcoin&vs_currencies=php')
			.then(res => res.json())

		for (var key of Object.keys(tObj)){
			//console.log(key + "->" + tObj[key])
			await tokenModel.findOneAndUpdate(
				{ "tokenID" : `${key}` },
				{ php : tObj[key].php },
				{ upsert : true }
			);
		}

		console.log('Tokens Updated')
	}
	
});

