//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/textFunctions');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Command({
	name: "axs",
	description: "Axie Infinity Shard",
	async run(message, args, client) {

		if (args.length <= 4) {

			if (args.length == 1) {

				let result = await tokenModel.findOne({
					tokenID: "axie-infinity"
				})
				message.reply(`\`AXS\` **1** => \`PHP\` **${fix.toDecimal(result.php)}**`);

			} else if (args.length == 2) {
				/*
				!axs <amount>
				*/	
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				if(!isNaN(tokenNum)) {
					
					let result = await tokenModel.findOne({
						tokenID: "axie-infinity"
					})
					
					message.reply(`\`AXS\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * result.php)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!axs`, `!axs <amount>` or `!axs <amount> @ <price>`.");
				}

			} else if (args.length == 4) {
				/*
				!axs <amount> @ <price> 
				*/
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				let tokenPrc = parseFloat(args[3].replace(/,/g, ''))

				if(!isNaN(tokenNum) && !isNaN(tokenPrc) && args[2] == '@') {
					
					message.reply(`\`AXS\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * tokenPrc)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!axs`, `!axs <amount>` or `!axs <amount> @ <price>`.");
				}

			} else {

				return message.channel.send("Invalid command. Type `!axs`, `!axs <amount>` or `!axs <amount> @ <price>`.");
			}

		} else {

			return message.channel.send("Invalid command. Type `!axs`, `!axs <amount>` or `!axs <amount> @ <price>`.");
		}
	}
});
