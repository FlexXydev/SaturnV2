const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription(`Find out the bots uptime`),
        async execute(interaction, client) {

	if(interaction.member.id !== config.developperID) return interaction.reply({ content: 'this command is locked under the owner!', ephemeral: true})

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle('Uptime')
                .setDescription(`> <t:${parseInt(client.readyTimestamp / 1000,10)}:R>`)
    
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        },
    };
