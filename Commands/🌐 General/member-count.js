const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

 

module.exports = {

    data: new SlashCommandBuilder()

        .setName('member-count')

        .setDescription('Get the server member count'),

    async execute(interaction) {

        await interaction.reply({ embeds: [new EmbedBuilder().setColor('Blue').setDescription(`**${interaction.guild.name}** has **${interaction.guild.memberCount}** members.`)] });

    }

}