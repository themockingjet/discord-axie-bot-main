//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');
const profileModel = require('../Models/profileSchema');
const { MessageEmbed } = require("discord.js");
const convert = require('ether-converter')

module.exports = new Command({
	name: "api",
	description: "Peek axie genes.",
	async run(message, args, client, member) {

		// let signature = localStorage.getItem(storageKey + "_signatureAxieInfinity");
		// if (!signature) {
		// 	alert("No signature found");
		// 	return;
		// }
		
		await fetch('https://axieinfinity.com/api/v2/body-parts', {
									method: 'POST',
									headers: {
									'Content-Type': 'application/json'
									},
									})
								.then(r => r.json())
								.then(data => console.log(data))
	}
});
