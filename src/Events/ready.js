//
//
//
const Event = require("../Structures/Event.js");
const fetch = require('node-fetch');
const tokens = require('../Functions/tokenFunctions');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Event("ready", client => {
	console.log("Bot is ready!");
	
	client.channels.fetch('892482366596071425')
		.then(channel => {
			channel.send(`${client.user} is online.`)
		})

	tokens.fetchTokens();

	setInterval(() => {
			tokens.fetchTokens();
		},
		//2 minutes
		5000
	);
	
});

