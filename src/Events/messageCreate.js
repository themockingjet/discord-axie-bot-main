//
//
//
const { Client } = require("discord.js");
const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message, member) => {
	
	if (message.author.bot) return;

	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.substring(client.prefix.length).split(/ +/g);

	const cmd = args[0].toLowerCase();

	const command = client.commands.get(cmd) || client.aliases.get(cmd);

	if (!command) return message.reply(`${args[0]} is not a valid command!`);


	command.run(message, args, client, member);
});
