//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/numLocaleString.js');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Command({
	name: "weth",
	description: "WETH",
	async run(message, args, client) {
		
		if (args.length <= 4) {

			if (args.length == 1) {

				let result = await tokenModel.findOne({
					tokenID: "weth"
				})
				message.reply(`\`WETH\` **1** => \`PHP\` **${fix.toDecimal(result.php)}**`);

			} else if (args.length == 2) {
				/*
				!weth <amount>
				*/	
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				if(!isNaN(tokenNum)) {
					
					let result = await tokenModel.findOne({
						tokenID: "weth"
					})
					
					message.reply(`\`WETH\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * result.php)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!weth`, `!weth <amount>` or `!weth <amount> @ <price>`.");
				}

			} else if (args.length == 4) {
				/*
				!weth <amount> @ <price> 
				*/
				let tokenPrc = parseFloat(args[3].replace(/,/g, ''))

				if(!isNaN(tokenNum) && !isNaN(tokenPrc) && args[2] == '@') {
					
					message.reply(`\`WETH\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * tokenPrc)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!weth`, `!weth <amount>` or `!weth <amount> @ <price>`.");
				}

			} else {

				return message.channel.send("Invalid command. Type `!weth`, `!weth <amount>` or `!weth <amount> @ <price>`.");
			}

		} else {

			return message.channel.send("Invalid command. Type `!weth`, `!weth <amount>` or `!weth <amount> @ <price>`.");
		}
	}
});
