const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hey')
		.setDescription('Bot will say hi to yall'),
	async execute(interaction) {
		await interaction.reply('hey!');
	},
};
