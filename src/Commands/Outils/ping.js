const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "ping",
        this.description = "Permets de voir le ping du bot."
    }

    async execute(bot, interaction) {
const Embed = new EmbedBuilder()

        .setColor('Random')

        .setTitle('🏓 **Ping du bot**')

.setDescription(`Le ping du bot est de ${Date.now() - interaction.createdTimestamp}ms.`)

        .setTimestamp()

        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
        
        
        interaction.reply({ embeds: [Embed]});;
    }
}

module.exports = command