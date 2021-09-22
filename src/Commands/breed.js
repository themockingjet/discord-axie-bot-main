//
//
//
const Command = require("../Structures/Command.js");
const { table } = require('table');
const fix = require('../Functions/numLocaleString.js');
const tokenModel = require('../Models/tokenSchema');
const fetch = require('node-fetch');
const ax = require('../Functions/findaxie.js');
const convert = require('ether-converter');

module.exports = new Command({
	name: "breed",
	description: "Calculate breeding cost and profit.",
	async run(message, args, client) {

		if (args[1] == args[2]) {
			message.reply('Error: same axie.');
		} else if ((!args[1] && !args[2]) || (args.length < 3 || args.length > 3)){
			message.reply('Error: Invalid command. `!breed <axieID> <axieID>');
		}

		let axie1 = await fetch(`https://api.axie.technology/getaxies/${args[1]}`).then(res => res.json());
		let axie2 = await fetch(`https://api.axie.technology/getaxies/${args[2]}`).then(res => res.json());

		if ( axie2.matronId == axie1.id || axie2.sireId == axie1.id ) {
			message.reply('Error: cannot breed these two axies 2');
		} else if (axie1.matronId == axie2.id || axie1.sireId == axie2.id) {
			message.reply('Error: cannot breed these two axies 3');
		} else if (axie1.matronId == 0 || axie2.matronId == 0) {
			message.reply('Error: cannot breed these two axies 4');
		} else if (axie1.matronId == axie2.matronId || axie1.matronId == axie2.sireId) {
			message.reply('Error: cannot breed these two axies 5');
		} else if (axie1.sireId == axie2.matronId || axie1.sireId == axie2.sireId) {
			message.reply('Error: cannot breed these two axies 6');
		}

		let NoofBreed = 7;
		let ax1bc = axie1.breedCount;
		let ax2bc = axie2.breedCount;

		if (ax1bc > ax2bc) {

			NoofBreed = NoofBreed - ax1bc
		} else if (ax1bc < ax2bc) {

			NoofBreed = NoofBreed - ax2bc
		} else if (ax1bc == ax2bc){

			NoofBreed = NoofBreed - ax1bc
		}

		let slpCost = [
			150,
			300,
			450,
			750,
			1200,
			1950,
			3150
		]

		let axsCost = [
			2,
			4,
			6,
			8,
			10,
			12,
			14
		]

		//get token data
		let dtToken = await tokenModel.find({ 
			tokenID: { $in: ['smooth-love-potion',	'axie-infinity']}
		});

		//axs
		let axsprc = dtToken[0].php;

		//slp
		let slpprc = dtToken[1].php;

		var data = [[''],['SLP'],['TTL SLP'],['AXS'],['TOTAL']]
		// console.log(ax1bc + '/' + ax2bc)
		for(let i = 1; i <= NoofBreed; i++) {

			data[0][i] = 'Breed Count ' + (i)
			data[1][i] = slpCost[ax1bc] + " + " + slpCost[ax2bc]
			data[2][i] = (slpCost[ax1bc] + slpCost[ax2bc]).toString()
			data[3][i] = (axsCost[i-1]).toString()
			data[4][i] = (fix.toDecimal((data[2][i] * slpprc) + (axsCost[i-1] * axsprc)))
			ax1bc += 1;
			ax2bc += 1;
		}

		let xcolumnCount = NoofBreed + 1;
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

		let ethPrice = await tokenModel.findOne({
			tokenID: "ethereum"
		})

		//axie dominant
		let ax1parts = [axie1.parts[2].id, axie1.parts[3].id, axie1.parts[4].id, axie1.parts[5].id];
		let ax2parts = [axie2.parts[2].id, axie2.parts[3].id, axie2.parts[4].id, axie2.parts[5].id];
		let ax1class = [axie1.class];
		let ax2class = [axie2.class];
		let ax1stats = [axie1.stats.hp, axie1.stats.morale, axie1.stats.speed, axie1.stats.skill];
		let ax2stats = [axie2.stats.hp, axie2.stats.morale, axie2.stats.speed, axie2.stats.skill];
		

		//floor traits == 2
		let shuffled = ax1parts.sort(() => 0.5 - Math.random());
		let shuffled2 = ax2parts.sort(() => 0.5 - Math.random());
		
		

		let fnlflrprc = await getFloorAxies(ax1class, ax2class, shuffled, shuffled2);
		let fnlssbredprc = await getBredSameTrait(ax1parts, ax2parts, ax1class, ax2class, shuffled, shuffled2, ax1stats, ax2stats);
		let fnlssvirrpc = await getViginSameTrait(ax1parts, ax2parts, ax1class, ax2class, shuffled, shuffled2, ax1stats, ax2stats);
		

		var profitdata1 = [['Floor'],['Axie Price'],['Profit']]
		for(let i = 1; i <= NoofBreed; i++) {

			profitdata1[0][i] = 'Breed Count ' + i;
			profitdata1[1][i] = fix.toDecimal((fnlflrprc * i) * ethPrice.php);
			
			parseFloat(profitdata1[1][i].replace(/,/g, ''))
			let prft = (parseFloat(profitdata1[1][i].replace(/,/g, '')) - parseFloat(data[4][i].replace(/,/g, '')))
			profitdata1[2][i] = fix.toDecimal(prft);
		}

		var profitdata2 = [['Bred'],['Axie Price'],['Profit']]
		for(let i = 1; i <= NoofBreed; i++) {

			profitdata2[0][i] = 'Breed Count ' + i;
			profitdata2[1][i] = fix.toDecimal((fnlssbredprc * i) * ethPrice.php);
			
			parseFloat(profitdata2[1][i].replace(/,/g, ''))
			let prft = (parseFloat(profitdata2[1][i].replace(/,/g, '')) - parseFloat(data[4][i].replace(/,/g, '')))
			profitdata2[2][i] = fix.toDecimal(prft);
		}

		var profitdata3 = [['Virgin'],['Axie Price'],['Profit']]
		for(let i = 1; i <= NoofBreed; i++) {

			profitdata3[0][i] = 'Breed Count ' + i;
			profitdata3[1][i] = fix.toDecimal((fnlssvirrpc * i) * ethPrice.php);

			parseFloat(profitdata3[1][i].replace(/,/g, ''))
			let prft = (parseFloat(profitdata3[1][i].replace(/,/g, '')) - parseFloat(data[4][i].replace(/,/g, '')))
			profitdata3[2][i] = fix.toDecimal(prft);
		}


		
		message.channel.send(`\`\`\`cs\n${table(data, config)}\n\`\`\``);

		message.channel.send(`\`\`\`cs\nAverage price of both parents with 2 random parts.\n${table(profitdata1, config)}\`\`\``);
		
		message.channel.send(`\`\`\`cs\nAverage price of bred axies with same 4 parts and stats.\n${table(profitdata2, config)}\`\`\``);

		message.channel.send(`\`\`\`cs\nAverage price of virgin axies with same 4 parts and stats.\n${table(profitdata3, config)}\`\`\``);
	}
});

async function getFloorAxies(ax1class, ax2class, shuffled, shuffled2) {

	let flrClassVirgin = await ax.findCommonAxie(ax1class, shuffled.slice(0,2), [0,0])
	let flrRes = (flrClassVirgin.data.axies.total != 0) ? flrClassVirgin.data.axies.results[0] : shuffled.slice(0,1);
	let flrcurrentPrice = (flrRes != null) 				? flrRes.auction.currentPrice : null;
	let flrpriceConverted = (flrcurrentPrice != null ) 	? convert(flrcurrentPrice, 'wei', 'ether') : 0;

	let flrClassVirgin2 = await ax.findCommonAxie(ax2class, shuffled2.slice(0,2), [0,0])
	let flrRes2 = (flrClassVirgin.data.axies.total != 0) 	? flrClassVirgin2.data.axies.results[0] : shuffled.slice(0,1);
	let flrcurrentPrice2 = (flrRes != null) 				? flrRes2.auction.currentPrice : null;
	let flrpriceConverted2 = (flrcurrentPrice != null ) 	? convert(flrcurrentPrice2, 'wei', 'ether') : 0;

	let flrPriceAverage = (parseFloat(flrpriceConverted) + parseFloat(flrpriceConverted2))/2

	return flrPriceAverage
}

async function getBredSameTrait(ax1parts, ax2parts, ax1class, ax2class, shuffled, shuffled2, ax1stats, ax2stats) {
	//same skill bred
	let sameSkillBred = await ax.findCommonAxie(ax1class, ax1parts, [1,7], ax1stats)
	let ssBredRes = (sameSkillBred.data.axies.total != 0) 		? sameSkillBred.data.axies.results[0] : shuffled.slice(0,3);
	let ssBredcurrentPrice = ( ssBredRes != null )				? ssBredRes.auction.currentPrice : null;
	let ssBredpriceConverted = (ssBredcurrentPrice != null) 	? convert(ssBredcurrentPrice, 'wei', 'ether') : null;

	let sameSkillBred2 = await ax.findCommonAxie(ax2class, ax2parts, [1,7], ax2stats)
	let ssBredRes2 = (sameSkillBred.data.axies.total != 0) 		? sameSkillBred2.data.axies.results[0] : shuffled2.slice(0,3);
	let ssBredcurrentPrice2 = ( ssBredRes != null )				? ssBredRes2.auction.currentPrice : null;
	let ssBredpriceConverted2 = (ssBredcurrentPrice != null) 	? convert(ssBredcurrentPrice2, 'wei', 'ether') : null;

	let ssBredPriceAverage = (parseFloat(ssBredpriceConverted) + parseFloat(ssBredpriceConverted2))/2
	return ssBredPriceAverage
}

async function getViginSameTrait(ax1parts, ax2parts, ax1class, ax2class, shuffled, shuffled2, ax1stats, ax2stats) {
	//virgin same skill
	let sameSkillVirgin = await ax.findCommonAxie(ax1class, ax1parts, [0,0], ax1stats)
	let ssVirRes = (sameSkillVirgin.data.axies.total != 0) 		? sameSkillVirgin.data.axies.results[0] : shuffled.slice(0,3);
	let ssVircurrentPrice = ( ssVirRes != null )				? ssVirRes.auction.currentPrice : null;
	let ssVirpriceConverted = (ssVircurrentPrice != null) 	? convert(ssVircurrentPrice, 'wei', 'ether') : null;

	let sameSkillVirgin2 = await ax.findCommonAxie(ax2class, ax2parts, [0,0], ax2stats)
	let ssVirRes2 = (sameSkillVirgin.data.axies.total != 0) 		? sameSkillVirgin2.data.axies.results[0] : shuffled2.slice(0,3);
	let ssVircurrentPrice2 = ( ssVirRes != null )				? ssVirRes2.auction.currentPrice : null;
	let ssVirpriceConverted2 = (ssVircurrentPrice != null) 	? convert(ssVircurrentPrice2, 'wei', 'ether') : null;

	let ssVirPriceAverage = (parseFloat(ssVirpriceConverted) + parseFloat(ssVirpriceConverted2))/2
	return ssVirPriceAverage
}
