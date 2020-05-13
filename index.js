/*
	This is a DJ bot to play some music
	@author: German Rafael Gomez Urbina <grgomezu@gmail.com>

	Resources:
		- https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
		- https://discord.js.org/#/docs/main/stable/topics/voice
		- https://blog.pragmatists.com/let-your-javascript-variables-be-constant-1633e56a948d
*/

const Discord = require('discord.js');
const ytdl = require('ytdl-core');

/* pass in token through config */
const config = require('./config.json');
const client = new Discord.Client();
let connection = undefined;

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

	if (command === 'join') {

		if (!message.guild) return;

		if (message.member.voice.channel) {
			if (connection === undefined) {
				connection = await message.member.voice.channel.join();
			}
		}
		else {
			message.reply('Hey broski! Join a voice channel first!');
		}
	}

	if (command === 'play') {
		/* For now... I WILL SURVIVE!! */
		connection.play(ytdl('https://www.youtube.com/watch?v=gYkACVDFmeg', { filter: 'audioonly' }));
	}
});

client.login(config.token);
