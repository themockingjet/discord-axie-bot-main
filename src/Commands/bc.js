//
//
//
const Command = require("../Structures/Command.js");
const fix = require('../Functions/numLocaleString.js');
const tokenModel = require('../Models/tokenSchema');
const breedcostModel = require('../Models/breedcostSchema');
const { table } = require('table');
const config = require("../Data/config.json"); 
const { assertDirective } = require("graphql");

module.exports = new Command({
	name: "breedCount",
	aliases: ["bc","sbc","setbreedcost"],
	description: "Breed Cost",
	async run(message, args, client) {
		
		
		
		if(args.length <= 3) {
			/*
			Table Config
			*/
			var data = [
				["BC", "0", "1", "2", "3", "4", "5", "6"],
				["SLP", "0", "0", "0", "0", "0", "0", "0"],
				["AXS", "0", "1", "1", "1", "1", "1", "1"],
				["TOTAL", "0", "1", "1", "1", "1", "1", "1"]
			];

			const tblConfig = {
				columns: [
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' },
				  { alignment: 'center' }
				]
			};
			if(args.length == 1) {
				//get token data
				let dtToken = await tokenModel.find({ 
					tokenID: { $in: ['smooth-love-potion',	'axie-infinity']}
				});

				let dtBreedCost = await breedcostModel.find({ 
					_id: 1
				});

				let resSlp = dtBreedCost[0].slpCost;
				let resAxs = dtBreedCost[0].axsCost;
				//axs
				let axsprc = dtToken[0].php;
	
				//slp
				let slpprc = dtToken[1].php;
				slCost = 0;
				for (let x = 1; x < data[0].length; x++) {
					slCost +=  (resSlp[x-1] * 2)
					data[1][x] = slCost;
					data[2][x] = `${x}`; 
				}

				for (let x = 1; x < data[0].length; x++) {

					data[3][x] = `${fix.toDecimal((slpprc * data[1][x]) + (axsprc * data[2][x]))}`

				}

				message.channel.send(`\`\`\`cs\n${table(data, tblConfig)}\`\`\``)

			} else if (args.length == 3 && ((args[0] == "sbc" || args[0] == "setbreedcount") && args[1] == "slp")) {
				
				if (message.author.id != config.adminId) {
					message.channel.send(`Error: No permission.`);
					return;
				}

				let nbc = args[2].split(",");
				if (nbc.length != 7) {
					message.channel.send('Error: Params not enough.\n'
										+`Breed Count 0: ${(nbc[0] != null) ? nbc[0] : "??" }\n`
										+`Breed Count 1: ${(nbc[1] != null) ? nbc[1] : "??" }\n`
										+`Breed Count 2: ${(nbc[2] != null) ? nbc[2] : "??" }\n`
										+`Breed Count 3: ${(nbc[3] != null) ? nbc[3] : "??" }\n`
										+`Breed Count 4: ${(nbc[4] != null) ? nbc[4] : "??" }\n`
										+`Breed Count 5: ${(nbc[5] != null) ? nbc[5] : "??" }\n`
										+`Breed Count 6: ${(nbc[6] != null) ? nbc[6] : "??" }`)
				}

				await breedcostModel.findOneAndUpdate(
					{ _id : 1 },
					{slpCost: { 
						0: nbc[0],
						1: nbc[1],
						2: nbc[2],
						3: nbc[3],
						4: nbc[4],
						5: nbc[5],
						6: nbc[6]
					}},
					{ upsert : true }
				);

				message.channel.send(`Slp cost updated successfully`);

			} else if (args.length == 3 && ((args[0] == "sbc" || args[0] == "setbreedcost") && args[1] == "axs")) {

				if (message.author.id != config.adminId) {
					message.channel.send(`Error: No permission.`);
					return;
				}

				let nbc = args[2];

				await breedcostModel.findOneAndUpdate(
					{ _id : 1 },
					{ axsCost: nbc },
					{ upsert : true }
				);

				message.channel.send(`Axs cost updated successfully`);
			} else if (args.length == 2 && args[0] != "sbc") {

				let brdcnt = args[1].split(",");

				if (brdcnt.length > 2) {
					message.channel.send('Error: 2 axie breed counts only.');
					return;
				} 

				if (brdcnt[1] >= 7 || brdcnt[0] >= 7) {
					message.channel.send('Error: Breed mo ulo mo.');
					return;
				}

				let breeds = 0;
				let bc1 = brdcnt[0];
				let bc2 = brdcnt[1];

				if (bc1 > bc2) {
					breeds = 7 - bc1;
				} else if (bc1 < bc2) {
					breeds = 7 - bc2;
				} else if (bc1 == bc2) {
					breeds = 7 - bc1;
				} else {
					message.channel.send('Error: Bobo.');
					return;
				}

				let dtTbl = [["BC"],["SLP"],["AXS"],["TOTAL"]]
				for (let i = 1; i <= breeds; i++) {
					dtTbl[0][i] = i;
					dtTbl[1][i] = "";
					dtTbl[2][i] = "";
					dtTbl[3][i] = "";
				}

				let dtToken = await tokenModel.find({ 
					tokenID: { $in: ['smooth-love-potion',	'axie-infinity']}
				});

				let dtBreedCost = await breedcostModel.find({ 
					_id: 1
				});

				let resSlp = dtBreedCost[0].slpCost;

				//axs
				let axsprc = dtToken[0].php;

				//slp
				let slpprc = dtToken[1].php;
				for (let x = 1; x <= breeds; x++) {
					// horizontal
					dtTbl[1][x] = resSlp[bc1] + resSlp[bc2];
					dtTbl[2][x] = `${x}`;
					bc1++
					bc2++
					dtTbl[3][x] = `${fix.toDecimal((slpprc * dtTbl[1][x]) + (axsprc * dtTbl[2][x]))}`;
				}

				message.channel.send(`\`\`\`cs\n${table(dtTbl, tblConfig)}\`\`\``)
			}
		}else {
			message.channel.send('Error: Invalid command. `!bc` to show breeding costs.')
		}
		
	}
});