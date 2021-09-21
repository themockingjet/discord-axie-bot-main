//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');

module.exports = new Command({
	name: "bc",
	description: "Breed Count",
	async run(message, args, client) {
		if (!args[1]) return message.channel.send("Invalid command. Type `!bc<space><amount>     #1-7` for more info.");
		if (isNaN(parseInt(args[1]))) return message.channel.send("Invalid amount. Type `!bc<space><amount>     #1-7` for more info.");
		if ((parseInt(args[1]) < 1 && parseInt(args[1] > 7))) return message.channel.send("Invalid amount. Type `!bc<space><amount>     #1-7` for more info.");
		if (args[2]) return message.channel.send("Invalid command. Type `!bc<space><amount>     #1-7` for more info.");

		let bslp = 0;
		let baxs = 0;
		let count = parseInt(args[1]);

		switch(count) {
			case 1:
				bslp = 300;
				baxs = 2;
				break;
			case 2:
				bslp = 900;
				baxs = 4;
				break;
			case 3:
				bslp = 1800;
				baxs = 6;
				break;
			case 4:
				bslp = 3300;
				baxs = 8;
				break;
			case 5:
				bslp = 5700;
				baxs = 10;
				break;
			case 6:
				bslp = 9600;
				baxs = 12;
				break;
			case 7:
				bslp = 15900;
				baxs = 14;
				break;
		}

		const aaxs = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=php')
						.then(res => res.json())
						.then(body => body['axie-infinity'].php.toFixed(2));
			
		const aslp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php')
						.then(res => res.json())
						.then(body => body['smooth-love-potion'].php.toFixed(2));

		var sslp = await (bslp * aslp).toFixed(2);
		var saxs = await (baxs * aaxs).toFixed(2);

		let total = await parseFloat(sslp) + parseFloat(saxs);
		total = total.toFixed(2);

		message.reply(`\`AXS\` **${baxs}** => \`PHP\` **${saxs}**\n\`SLP\` **${bslp}** => \`PHP\` **${sslp}**` 
					 +`\n\nTotal \`PHP\` => **${total}**`);
		
	}
});
