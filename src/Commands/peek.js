//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');
const { MessageAttachment,MessageEmbed } = require("discord.js");
const convert = require('ether-converter');
const nodeHtmlToImage = require('node-html-to-image');
const fixTime = require("../Functions/timeFunctions");

module.exports = new Command({
	name: "peek",
	aliases: ["p"],
	description: "Peek axie genes.",
	async run(message, args, client, member) {
		
		if (!args[1] && isNaN(parseInt(args[1]))) {
			return message.channel.send("Please the axies id you want to peek. `!peek 100001`")
		} else {
			
			const axieId = args[1].toString();

			var htmlCode = `<!DOCTYPE html>
			<html dir="ltr" lang="en" class="">
			<head>
				<meta charset="utf-8">
				<style>
					body { 
						background-color: transparent;
					}
					div.a {
						display: inline-block;
						width: 300px;
						height: 300px;
					}
					
					div.b {
						display: inline-block;
						width: 400px;
						height: 300px;
					}
					th {
						color: #000000;
					}
					th, td {
						font-family: verdana;
						font-size: 20px;
						font-weight: bold;
						padding: 3px;
					}
					#aquatic {
						color:#01B1C7;
					}
					#beast {
						color:#FFB812;
					}
					#bug {
						color:#B4433C;
					}
					#reptile {
						color:#C88AE0;
					}
					#plant {
						color:#60A808;
					}
					#bird {
						color:#FF8BBD;
					}
					table > 
				</style>
			</head>
			<body>
			<div class="a">
				<img src="https://storage.googleapis.com/assets.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png" 
					 alt=""
					 style="height: 100%; width: 100%; object-fit: contain;">
			</div>
			<div class="b">
				<table>
					<tr>
					  <th>D</th>
					  <th>R1</th>
					  <th>R2</th>
					</tr>
					<tr>
						<td id="{{ceD}}">{{eyesD}}</td>
						<td id="{{ceR1}}">{{eyesR1}}</td>
						<td id="{{ceR2}}">{{eyesR2}}</td>
					</tr>
					<tr>
						<td id="{{ceaD}}">{{earsR1}}</td>
						<td id="{{ceaR1}}">{{earsR2}}</td>
						<td id="{{ceaR2}}">{{earsD}}</td>
					</tr>
					<tr>
						<td id="{{cmD}}">{{mouthD}}</td>
						<td id="{{cmR1}}">{{mouthR1}}</td>
						<td id="{{cmR2}}">{{mouthR2}}</td>
					</tr>
					<tr>
						<td id="{{chD}}">{{hornD}}</td>
						<td id="{{chR1}}">{{hornR1}}</td>
						<td id="{{chR2}}">{{hornR2}}</td>
					</tr>
					<tr>
						<td id="{{cbD}}">{{backD}}</td>
						<td id="{{cbR1}}">{{backR1}}</td>
						<td id="{{cbR2}}">{{backR2}}</td>
					</tr>
					<tr>
						<td id="{{ctD}}">{{tailD}}</td>
						<td id="{{ctR1}}">{{tailR1}}</td>
						<td id="{{ctR2}}">{{tailR2}}</td>
					</tr>
				</table>
			</div>
				
			
			
			</body>
			</html>`

			const axieGene = await fetch(`https://api.axie.technology/getgenes/${args[1]}`)
			.then(res => res.json());

			const axieStats = await fetch(`https://api.axie.technology/getaxies/${args[1]}`)
			.then(res => res.json());
			
			if(axieStats == null) {
				message.reply(`Error: Axie: ${axieId} not found.`)
				return
			} else if (axieStats.bodyShape == null) {
				message.reply(`Error: Axie: ${axieId} is an egg.`)
				return
			}

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

			const geneImg = await nodeHtmlToImage({
					html: htmlCode,
					type: 'png',
					transparent: true,
					content: {
						eyesD: axieGene.eyes.d.name,
						ceD: axieGene.eyes.d.class,
						eyesR1: axieGene.eyes.r1.name,
						ceR1: axieGene.eyes.r1.class,
						eyesR2: axieGene.eyes.r2.name,
						ceR2: axieGene.eyes.r2.class,
						earsD: axieGene.ears.d.name,
						ceaD: axieGene.ears.d.class,
						earsR1: axieGene.ears.r1.name,
						ceaR1: axieGene.ears.r1.class,
						earsR2: axieGene.ears.r2.name,
						ceaR2: axieGene.ears.r2.class,
						mouthD: axieGene.mouth.d.name,
						cmD: axieGene.mouth.d.class,
						mouthR1: axieGene.mouth.r1.name,
						cmR1: axieGene.mouth.r1.class,
						mouthR2: axieGene.mouth.r2.name,
						cmR2: axieGene.mouth.r2.class,
						hornD: axieGene.horn.d.name,
						chD: axieGene.horn.d.class,
						hornR1: axieGene.horn.r1.name,
						chR1: axieGene.horn.r1.class,
						hornR2: axieGene.horn.r2.name,
						chR2: axieGene.horn.r2.class,
						backD: axieGene.back.d.name,
						cbD: axieGene.back.d.class,
						backR1: axieGene.back.r1.name,
						cbR1: axieGene.back.r1.class,
						backR2: axieGene.back.r2.name,
						cbR2: axieGene.back.r2.class,
						tailD: axieGene.tail.d.name,
						ctD: axieGene.tail.d.class,
						tailR1: axieGene.tail.r1.name,
						ctR1: axieGene.tail.r1.class,
						tailR2: axieGene.tail.r2.name,
						ctR2: axieGene.tail.r2.class,
					}
				})
			const file = new MessageAttachment(geneImg, 'axie.png')
			
			const embed = new MessageEmbed()
				.setColor('#FFFFFF')
				.setTitle(`${args[1]} - ${axieStats.class}`)
				.setURL(`https://marketplace.axieinfinity.com/axie/${args[1]}`)
				.addFields(
					{ name: 'Breed Count:', value: `${axieStats.breedCount}/7`, inline: true }
				)

			//auction price
			const axAuction = axieStats.auction;
			
			if(axAuction != null) {
				var startingPrice = convert(axAuction.startingPrice, 'wei', 'ether')
				var endingPrice = convert(axAuction.endingPrice, 'wei', 'ether')
				var endTime = fixTime.getRelativeTime(+new Date(axAuction.endingTimestamp * 1000))
				//console.log(startingPrice)
				embed.addField('Price', `${startingPrice} ▶ ${endingPrice} 🕛 ${endTime}`, true )
			} else {
				embed.addField(`\u200B`, `\u200B` )
			}

			embed
				.setImage('attachment://axie.png')
				.setTimestamp()

			message.channel.send({ embeds: [embed], files: [ file ]});
		}
	}
});
