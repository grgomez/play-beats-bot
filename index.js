/*
	This is a DJ bot to play some music
	@author: German Rafael Gomez Urbina <grgomezu@gmail.com>
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
				message.reply(`joining the parteh!!\n \
If you want to have some fun let me know!\n \
My commands are:\n \
\t${config.prefix}hey - I'll holla at you!\n \
\t${config.prefix}join - I'll join the party!\n \
\t${config.prefix}play - I'll play a song!\n \
\t${config.prefix}pause - I'll pause the song!\n \
\t${config.prefix}stop - 'I'll cancel the song!\n`);
			}
		}
		else {
			message.reply('Broski! Join a voice channel first!');
		}
		break;
	case 'play':
		yts(args.join(' '), function(err, r) {
			const v = r.videos.shift();
			const embed = new Discord.MessageEmbed()
				.setTitle(v.title)
				.setImage(v.image)
				.setURL(v.url);
			message.channel.send(embed);

			dispatcher = connection
				.play(ytdl(v.url, { filter: 'audioonly' }))
				.on('finish', () => {
					console.log('Finished playing song');
					dispatcher.destroy();
				});
		});

		break;
	case 'pause':
		if (dispatcher) dispatcher.pause();
		break;
	case 'stop':
		if (dispatcher) dispatcher.destroy();
		break;
	case 'resume':
		if (dispatcher) dispatcher.resume();
		break;
	}

});

client.login(config.token);
