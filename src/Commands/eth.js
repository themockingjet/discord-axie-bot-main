//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/numLocaleString.js');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Command({
	name: "eth",
	description: "ETH",
	async run(message, args, client) {
		
		if (args.length <= 4) {

			if (args.length == 1) {

				let result = await tokenModel.findOne({
					tokenID: "ethereum"
				})
				message.reply(`\`ETH\` **1** => \`PHP\` **${fix.toDecimal(result.php)}**`);

			} else if (args.length == 2) {
				/*
				!eth <amount>
				*/	
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				if(!isNaN(tokenNum)) {
					
					let result = await tokenModel.findOne({
						tokenID: "ethereum"
					})
					
					message.reply(`\`ETH\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * result.php)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");
				}

			} else if (args.length == 4) {
				/*
				!eth <amount> @ <price> 
				*/
				let tokenPrc = parseFloat(args[3].replace(/,/g, ''))

				if(!isNaN(tokenNum) && !isNaN(tokenPrc) && args[2] == '@') {
					
					message.reply(`\`ETH\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * tokenPrc)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");
				}

			} else {

				return message.channel.send("Invalid command. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");
			}

		} else {

			return message.channel.send("Invalid command. Type `!eth`, `!eth <amount>` or `!eth <amount> @ <price>`.");
		}
	}
});
