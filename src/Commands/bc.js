//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/numLocaleString.js');
const tokenModel = require('../Models/tokenSchema');
const { table } = require('table');

module.exports = new Command({
	name: "bc",
	description: "Breed Count",
	async run(message, args, client) {
		
		/*
		Table Config
		*/
		if(args.length < 1) {
			var data = [
				["", "Breed Count 1", "Breed Count 2", "Breed Count 3", "Breed Count 4", "Breed Count 5", "Breed Count 6", "Breed Count 7"],          
				["SLP", "600", "1500", "3000", "5400", "9300", "15600", "25800"],
				["AXS", "1", "2", "3", "4", "5", "6", "7"]
			];
	
			const config = {
				columns: [
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' }
				],
			  };
	
			/*
			Execute command
			*/
			
			if(args.length <= 1) {
				
				//get token data
				let dtToken = await tokenModel.find({ 
					tokenID: { $in: ['smooth-love-potion',	'axie-infinity']}
				});
	
				//axs
				let axsprc = dtToken[0].php;
	
				//slp
				let slpprc = dtToken[1].php;
				let ttlArr = ['PHP'];
	
				for(let i = 1; i < 8; i++) {
					ttlArr[i] = fix.toDecimal((slpprc * data[1][i]) + (axsprc * data[2][i]))
				}
	
				data[3] = ttlArr;
				message.channel.send(`\`\`\`cs\n${table(data, config)}\`\`\``)
			}
		} else {
			message.channel.send('Error: Invalid command. `!bc` to show breeding costs.')
		}
		
	}
});
