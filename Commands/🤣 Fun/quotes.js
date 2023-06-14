const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const quotes = require('../../quotes.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Gives you a random famous quote.'),
    async execute(interaction) {

        const randomizer = Math.floor(Math.random() * quotes.length);

        const embed = new EmbedBuilder()
        .setColor('DarkBlue')
        .setAuthor({ name: `🤔 Quote Carpet`})
        .setFooter({ text: `🤔 Quote Fetched`})
        .setTimestamp()
        .addFields({ name: `• Quote`, value: `> ${quotes[randomizer].text}`})
        .addFields({ name: `• Author`, value: `> ${quotes[randomizer].from}`})

        await interaction.reply({ embeds: [embed] });
    }
}