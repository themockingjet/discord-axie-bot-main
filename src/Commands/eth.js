//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');

module.exports = new Command({
	name: "eth",
	description: "ETH",
	async run(message, args, client) {
		if (args[1] && isNaN(parseFloat(args[1]))) {

			return message.channel.send("Invalid amount. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");

		} else if (!args[1]) {

			fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=php')
			.then(res => res.json())
			.then(body => message.reply(`\`ETH\` **1** => \`PHP\` **${Number(body['ethereum'].php).toLocaleString()}**`));

		} else if (args[2] === "@" && !args[3]) {

			return message.channel.send("Invalid command. Type `!ETH <amount> <@> <price>`.");

		} else if (args[2] === "@" && !isNaN(parseFloat(args[3]))){
			
			let y = parseFloat(args[3]).toFixed(2);
			let x = (y * args[1]).toFixed(2);
			x = Number(x).toLocaleString();
			message.reply(`\`ETH\` **${args[1]}** => \`PHP\` **${x}**`);
			
		} else if (!isNaN(parseFloat(args[1])) && !args[2]) {
			
			fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=php')
			.then(res => res.json())
			.then(body => {
				let x = (body['ethereum'].php * args[1]).toFixed(2);
				x = Number(x).toLocaleString();
				message.reply(`\`ETH\` **${args[1]}** => \`PHP\` **${x}**`);
			});

		} else {

			return message.channel.send("Invalid command. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");
		};
	}
});
