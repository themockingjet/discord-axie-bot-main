//
//
//
const Command = require("../Structures/Command.js");
const fetch = require('node-fetch');
const profileModel = require('../Models/profileSchema');
const { MessageEmbed } = require("discord.js");
const convert = require('ether-converter');
const https = require('https');

module.exports = new Command({
	name: "api2",
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
		let headers = {
			"Content-Type":"application/json",
			"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjE4NzMxMTMsImFjdGl2YXRlZCI6dHJ1ZSwicm9uaW5BZGRyZXNzIjoiMHg0NWJiZWJkMWUwZjgwMjYzZWQzOWI0YjFkZWM3NGI5YzdlODdmNGUwIiwiZXRoQWRkcmVzcyI6IjB4NDViYmViZDFlMGY4MDI2M2VkMzliNGIxZGVjNzRiOWM3ZTg3ZjRlMCIsImlhdCI6MTYzMjM1MjEwMCwiZXhwIjoxNjMyOTU2OTAwLCJpc3MiOiJBeGllSW5maW5pdHkifQ.rR2E8PeweD3y_QEAhzxGjQN7_KVI4PXjQ7g8RfM46fw"
		}
		let x = await fetch('https://game-api.axie.technology/player/0x45bbebd1e0f80263ed39b4b1dec74b9c7e87f4e0', {
			method:'GET',
			headers: headers
		})
			.then(res => res.json())
			.then(data => console.log(data))

		// var myDate = new Date( x[0].update_time * 1000);
		// console.log(getRelativeTime(new Date(myDate)));

		// const options = {
		// 	hostname: 'game-api.axie.technology',
		// 	port: 443,
		// 	method: 'GET',
		// 	path: '/player/0x45bbebd1e0f80263ed39b4b1dec74b9c7e87f4e0/',
		// 	headers: headers
		// }

		// url = "https://game-api.axie.technology/player/0x45bbebd1e0f80263ed39b4b1dec74b9c7e87f4e0"

		// var response = https.request('GET', url , headers);
		// console.log(response)

		// const req = https.request(options, res => {
		// 	console.log(`statusCode: ${res.statusCode}`)
		  
		// 	res.on('data', d => {
		// 	  process.stdout.write(d)
		// 	})
		//   })
		  
		//   req.on('error', error => {
		// 	console.error(error)
		//   })
		  
		//   req.end()

	}
});
