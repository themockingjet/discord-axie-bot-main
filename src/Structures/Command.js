//
//
//
const Client = require("./Client.js");

const Discord = require("discord.js");

/**
 * @param {Discord.Message | Discord.Interaction} message
 * @param {string[]} args
 * @param {Client} client
 * @param {Discord.GuildMember} member
 */
function RunFunction(message, args, client, member) {}

class Command {
	/**
	 * @typedef {{name: string, description: string, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.run = options.run;
	}
}

module.exports = Command;
