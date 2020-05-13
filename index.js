/*
	This is a DJ bot to play some music
	@author: German Rafael Gomez Urbina <grgomezu@gmail.com>

	Resources:
		- https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3
		- https://discord.js.org/#/docs/main/stable/topics/voice
		- https://blog.pragmatists.com/let-your-javascript-variables-be-constant-1633e56a948d
		- https://openbase.io/js/ytdl-core
		- https://gabrieltanner.org/blog/dicord-music-bot
		- https://www.npmjs.com/package/yt-search
		- https://www.writebots.com/how-to-make-a-discord-bot/

*/

const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

/* pass in token through config */
const config = require('./config.json');
const client = new Discord.Client();
let connection = undefined;
let dispatcher = undefined;

client.once('ready', () => {
	console.log('I am ready to play some beats!');
});

client.on('message', async message => {

	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	switch (command) {
	case 'hey':
		message.channel.send('hey buddy! Wanna hear some music?');
		break;
	case 'join':
		if (!message.guild) return;

		if (message.member.voice.channel) {
			if (connection === undefined) {
				connection = await message.member.voice.channel.join();
				message.reply('joining the parteh!!');
			}
		}
		else {
			message.reply('Broski! Join a voice channel first!');
		}
		break;
	case 'play':
		/* For now... I WILL SURVIVE!! */
		dispatcher = connection
			.play(ytdl('https://www.youtube.com/watch?v=gYkACVDFmeg', { filter: 'audioonly' }))
			.on('finish', () => {
				console.log('Finished playing song');
				dispatcher.destroy();
			});
		break;
	case 'pause':
		dispatcher.pause();
		break;
	case 'stop':
		dispatcher.destroy();
		break;
	}

});

client.login(config.token);
