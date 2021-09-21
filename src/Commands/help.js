//
//
//
const Command = require("../Structures/Command.js");

module.exports = new Command({
	name: "help",
	description: "Hello!",

	async run(message, args, client) {
		if (!args[1]) return message.channel.send("Invalid command. Type `!help crypto` for more info.")
		if (!args[2] && args[1] != "crypto") return message.channel.send("Invalid command. Type `!help crypto` for more info.")

		message.channel.send("```Crypto Converter - converts amount of slp to its current value.\n\n"
						+ 	 "Available Tokens: axs, slp, weth, pvu, skill, eth\n\n"
						+	 "How to: !<token> <amount> or !<token> <amount> @ <price>\n"
						+	 "E.g.\n!slp [default 1]\n!slp 200 [200 SLP]\n!slp 200 @ 7.30 [200 SLP at 7.30 php]\n\n"
						+	 "Extra: Breed Cost\n"
						+	 "!bc 1 [1-7]```");
						
	}
});
