//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');
const profileModel = require('../Models/profileSchema');
const { MessageEmbed } = require("discord.js");
const convert = require('ether-converter')

module.exports = new Command({
	name: "peek",
	description: "Peek axie genes.",
	async run(message, args, client, member) {

		var units = {
			year  : 24 * 60 * 60 * 1000 * 365,
			month : 24 * 60 * 60 * 1000 * 365/12,
			day   : 24 * 60 * 60 * 1000,
			hour  : 60 * 60 * 1000,
			minute: 60 * 1000,
			second: 1000
		}

		var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

		var getRelativeTime = (d1, d2 = new Date()) => {
			var elapsed = d1 - d2
			// "Math.abs" accounts for both "past" & "future" scenarios
			for (var u in units) 
			  if (Math.abs(elapsed) > units[u] || u == 'second') 
				return rtf.format(Math.round(elapsed/units[u]), u)
		}
		
		if (!args[1] && isNaN(parseInt(args[1]))) {
			return message.channel.send("Please the axies id you want to peek. `!peek 100001`")
		} else {
			
			const axieGene = await fetch(`https://api.axie.technology/getgenes/${args[1]}`)
			.then(res => res.json());

			const axieStats = await fetch(`https://api.axie.technology/getaxies/${args[1]}`)
			.then(res => res.json());
			
			const axieId = args[1].toString();

			const query = `query GetAxieDetail($axieId: ID!) {
				axie(axieId: $axieId) {
				  ...AxieDetail
				  __typename
				}
			  }
			  
			  fragment AxieDetail on Axie {
				id
				image
				class
				chain
				name
				genes
				owner
				birthDate
				bodyShape
				class
				sireId
				sireClass
				matronId
				matronClass
				stage
				title
				breedCount
				level
				figure {
				  atlas
				  model
				  image
				  __typename
				}
				parts {
				  ...AxiePart
				  __typename
				}
				stats {
				  ...AxieStats
				  __typename
				}
				auction {
				  ...AxieAuction
				  __typename
				}
				ownerProfile {
				  name
				  __typename
				}
				battleInfo {
				  ...AxieBattleInfo
				  __typename
				}
				children {
				  id
				  name
				  class
				  image
				  title
				  stage
				  __typename
				}
				__typename
			  }
			  
			  fragment AxieBattleInfo on AxieBattleInfo {
				banned
				banUntil
				level
				__typename
			  }
			  
			  fragment AxiePart on AxiePart {
				id
				name
				class
				type
				specialGenes
				stage
				abilities {
				  ...AxieCardAbility
				  __typename
				}
				__typename
			  }
			  
			  fragment AxieCardAbility on AxieCardAbility {
				id
				name
				attack
				defense
				energy
				description
				backgroundUrl
				effectIconUrl
				__typename
			  }
			  
			  fragment AxieStats on AxieStats {
				hp
				speed
				skill
				morale
				__typename
			  }
			  
			  fragment AxieAuction on Auction {
				startingPrice
				endingPrice
				startingTimestamp
				endingTimestamp
				duration
				timeLeft
				currentPrice
				currentPriceUSD
				suggestedPrice
				seller
				listingIndex
				state
				__typename
			  }`;

			const axGraph = await fetch('https://graphql-gateway.axieinfinity.com/graphql', {
									method: 'POST',
									headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json',
									},
									body: JSON.stringify({
										"operationName": "GetAxieDetail",
										"variables": {
										"axieId": axieId
										},
										query
									})
									})
								.then(r => r.json())
			
			//embed
			const embed = new MessageEmbed()
				.setColor('#FFFFFF')
				.setTitle(`${args[1]}`)
				.setURL(`https://marketplace.axieinfinity.com/axie/${args[1]}`)
				.addFields(
					{ name: 'Class: ', value: `${axieStats.class}`, inline: true },
					{ name: 'Breed Count:', value: `${axieStats.breedCount}/7`, inline: true }
				)

			//auction price
			const axAuction = axGraph.data.axie.auction;
			
			if(axAuction != null) {
				var startingPrice = convert(axAuction.startingPrice, 'wei', 'ether')
				var endingPrice = convert(axAuction.endingPrice, 'wei', 'ether')
				var endTime = getRelativeTime(+new Date(axAuction.endingTimestamp * 1000))
				//console.log(startingPrice)
				embed.addField('Price', `${startingPrice} ▶ ${endingPrice} 🕛 ${endTime}`, true )
			}

			embed
				.addFields(
					{ name: '\u200b', value: '\u200b' },
					// Stats
					//{ name: 'Stats', value: `**Health**: ${axieStats.stats.hp}     **Speed**: ${axieStats.stats.speed}     **Skill**: ${axieStats.stats.skill}     **Morale**: ${axieStats.stats.morale}`}
					{ 
						name: 'D', 
						value: `${axieGene.eyes.d.name} [${axieGene.eyes.d.class.substr(0,1)}]
								${axieGene.ears.d.name} [${axieGene.ears.d.class.substr(0,1)}]
								${axieGene.mouth.d.name} [${axieGene.mouth.d.class.substr(0,1)}]
								${axieGene.horn.d.name} [${axieGene.horn.d.class.substr(0,1)}]
								${axieGene.back.d.name} [${axieGene.back.d.class.substr(0,1)}]
								${axieGene.tail.d.name} [${axieGene.tail.d.class.substr(0,1)}]`, 
						inline: true },
					{ 
						name: 'R1', 
						value: `${axieGene.eyes.r1.name} [${axieGene.eyes.r1.class.substr(0,1)}]
								${axieGene.ears.r1.name} [${axieGene.ears.r1.class.substr(0,1)}]
								${axieGene.mouth.r1.name} [${axieGene.mouth.r1.class.substr(0,1)}]
								${axieGene.horn.r1.name} [${axieGene.horn.r1.class.substr(0,1)}]
								${axieGene.back.r1.name} [${axieGene.back.r1.class.substr(0,1)}]
								${axieGene.tail.r1.name} [${axieGene.tail.r1.class.substr(0,1)}]`, 
						inline: true },
					{ 
						name: 'R2', 
						value: `${axieGene.eyes.r2.name} [${axieGene.eyes.r2.class.substr(0,1)}]
								${axieGene.ears.r2.name} [${axieGene.ears.r2.class.substr(0,1)}]
								${axieGene.mouth.r2.name} [${axieGene.mouth.r2.class.substr(0,1)}]
								${axieGene.horn.r2.name} [${axieGene.horn.r2.class.substr(0,1)}]
								${axieGene.back.r2.name} [${axieGene.back.r2.class.substr(0,1)}]
								${axieGene.tail.r2.name} [${axieGene.tail.r2.class.substr(0,1)}]`, 
						inline: true },
				)
				.setImage(`https://storage.googleapis.com/assets.axieinfinity.com/axies/${args[1]}/axie/axie-full-transparent.png`)
				.setTimestamp()
			
			// if (!args[2] && args[2] == 'genes') {
			// 	//add for 2nd arguments 'genes'
			// }
			message.channel.send({ embeds: [embed] });
		}



		// if (isNaN(parseInt(args[1]))) {
		// 	return message.channel.send("Invalid amount. Type `!axs <amount>` or `!axs <amount> @ <price>`.")

		// } else if (args[2] === "@" && !args[3]) {
		// 	return message.channel.send("Invalid command. Type `!axs <amount> <@> <price>`.")

		// } else if (args[2] === "@" && !isNaN(parseInt(args[3]))){
			
		// 	let y = parseFloat(args[3]).toFixed(2);
		// 	let x = (y * args[1]).toFixed(2);

		// 	message.reply(`\`AXS\` **${args[1]}** => \`PHP\` **${x}**`);
			
		// } else if (!isNaN(parseInt(args[1])) && !args[2]) {
			
		// 	fetch('https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=php')
		// 	.then(res => res.json())
		// 	.then(body => {
		// 		let x = body['axie-infinity'].php.toFixed(2) * args[1];
		// 		message.reply(`\`AXS\` **${args[1]}** => \`PHP\` **${x}**`);
		// 	});
		// } else {
		// 	return message.channel.send("Invalid command. Type `!axs <amount>` or `!axs <amount> @ <price>`.")
		// };
	}
});
