//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');
const profileModel = require('../Models/profileSchema');
const { MessageEmbed } = require("discord.js");
const convert = require('ether-converter')

module.exports = new Command({
	name: "leave",
	description: "Leave Discord",
	async run(message, args, client, member) {
		client.guilds.cache.get('id').leave();
		console.log('left ' + client.guilds.cache.get('id').name);
	}
});
