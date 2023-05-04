const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { iconURL } = require('../../config')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Allow to see the ping of the bot.'),

      async execute (interaction, client) {

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('🏓 **Ping of the bot**')
            .setDescription(`The ping of the bots is currently at ${Date.now() - interaction.createdTimestamp}ms`)
            .setFooter({ text: client.user.username, iconURL: iconURL })
            .setTimestamp()

            await interaction.reply({ embeds: [embed] })
      }
    
    }