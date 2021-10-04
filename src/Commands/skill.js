//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/textFunctions');
const tokenModel = require('../Models/tokenSchema');

module.exports = new Command({
	name: "skill",
	description: "Cryptoblades SKILL",
	async run(message, args, client) {
		
		if (args.length <= 4) {

			if (args.length == 1) {

				let result = await tokenModel.findOne({
					tokenID: "cryptoblades"
				})
				message.reply(`\`SKILL\` **1** => \`PHP\` **${fix.toDecimal(result.php)}**`);

			} else if (args.length == 2) {
				/*
				!skill <amount>
				*/	
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				if(!isNaN(tokenNum)) {
					
					let result = await tokenModel.findOne({
						tokenID: "cryptoblades"
					})
					
					message.reply(`\`SKILL\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * result.php)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");
				}

			} else if (args.length == 4) {
				/*
				!skill <amount> @ <price> 
				*/
				let tokenNum = parseFloat(args[1].replace(/,/g, ''));
				let tokenPrc = parseFloat(args[3].replace(/,/g, ''))

				if(!isNaN(tokenNum) && !isNaN(tokenPrc) && args[2] == '@') {
					
					message.reply(`\`SKILL\` **${tokenNum}** => \`PHP\` **${fix.toDecimal(tokenNum * tokenPrc)}**`);
				} else {

					return message.channel.send("Invalid command. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");
				}

			} else {

				return message.channel.send("Invalid command. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");
			}

		} else {

			return message.channel.send("Invalid command. Type `!skill`, `!skill <amount>` or `!skill <amount> @ <price>`.");
		}
	}
});
