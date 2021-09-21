//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');

module.exports = new Command({
	name: "skill",
	description: "Cryptoblades SKILL",
	async run(message, args, client) {
		if (args[1] && isNaN(parseFloat(args[1]))) {

			return message.channel.send("Invalid amount. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");

		} else if (!args[1]) {

			fetch('https://api.coingecko.com/api/v3/simple/price?ids=cryptoblades&vs_currencies=php')
			.then(res => res.json())
			.then(body => message.reply(`\`SKILL\` **1** => \`PHP\` **${Number(body['cryptoblades'].php).toLocaleString()}**`));

		} else if (args[2] === "@" && !args[3]) {

			return message.channel.send("Invalid command. Type `!skill <amount> <@> <price>`.");

		} else if (args[2] === "@" && !isNaN(parseFloat(args[3]))){
			
			let y = parseFloat(args[3]).toFixed(2);
			let x = (y * args[1]).toFixed(2);
			x = Number(x).toLocaleString();
			message.reply(`\`SKILL\` **${args[1]}** => \`PHP\` **${x}**`);
			
		} else if (!isNaN(parseFloat(args[1])) && !args[2]) {
			
			fetch('https://api.coingecko.com/api/v3/simple/price?ids=cryptoblades&vs_currencies=php')
			.then(res => res.json())
			.then(body => {
				let x = (body['cryptoblades'].php * args[1]).toFixed(2);
				x = Number(x).toLocaleString();
				message.reply(`\`SKILL\` **${args[1]}** => \`PHP\` **${x}**`);
			});

		} else {

			return message.channel.send("Invalid command. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");

		};
	}
});
