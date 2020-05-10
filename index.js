const Discord = require('discord.js');
const client = new Discord.Client();
// pass in token through config
// got some ideas from: https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
const config = require('./config.json');

client.once('ready', () => {
	console.log('I am ready to play some beats!');
});

client.on('message', async message => {

	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'hey') {
		message.channel.send('Hey buddy! Wanna hear some music?');
	}
});

client.login(config.token);
