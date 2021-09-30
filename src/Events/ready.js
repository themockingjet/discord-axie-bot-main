//
//
//
const Event = require("../Structures/Event.js");
const fetch = require('node-fetch');
const tokenModel = require('../Models/tokenSchema');
// const morphModel = require('../Models/morphSchema');
const { MessageEmbed } = require("discord.js");


module.exports = new Event("ready", async client => {
	const clUser = client.user
	console.log("Bot is ready!");

	client.channels.cache.get('892482366596071425').send(`${clUser} is online.`);

	
	// setRemindersData(client, clUser);
});

// async function getRemindersData() {

// 	const dbData = await morphModel.find({})
// 	return dbData;

// }

// async function setRemindersData(client, clUser) {

// 	let remRes = await getRemindersData();
// 	console.log(remRes[0])
// 	for (let i = 0; i < remRes.length; i++) {
// 		ndate = new Date(remRes[i].morphDate).toLocaleString("en-US","en-US", {month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})
// 		setTimeout(() => {
// 			client.channels.cache('892482366596071425').send(remEmbed(remRes[i].axieID, remRes[i].axieFigure, ndate, clUser))	
// 		}, (remRes[i].morphDate * 1000))
// 		console.log(`Reminders for egg: ${remRes[i].axieID}`)
// 	}

// }

async function setTokens() {
	const tObj = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion%2Caxie-infinity%2Cethereum%2Cplant-vs-undead-token%2Ccryptoblades%2Cweth%2Cbitcoin&vs_currencies=php')
							.then(res => res.json())

	for (var key of Object.keys(tObj)){
		
		await tokenModel.findOneAndUpdate(
			{ "tokenID" : `${key}` },
			{ php : tObj[key].php },
			{ upsert : true }
		);
	}

	console.log('Tokens Updated')
}

function remEmbed(axieID, axieImage, epochTime, client) {
	const exampleEmbed = new MessageEmbed()
		.setColor('#FFFFFF')
		.setTitle(`${axieID}`)
		.setURL('https://dhttps://marketplace.axieinfinity.com/axie/' + axieID)
		.setAuthor(`${client}`)
		.setThumbnail(`${axieImage}`)
		.setDescription(`${epochTime}`)
	return exampleEmbed;
}