const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "redémarrer",
        this.description = "! Devellopeurs uniquement !"
    }

    async execute(bot, interaction) {
        const Shutting = new EmbedBuilder()
        .setColor('Red')
        .setDescription(`**${bot.config.clients.name} wil shutdown !**`)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo })
        
                const Denied = new EmbedBuilder()
        .setColor('Red')
        .setDescription(`**Vous n'avez pas le droit d'executer cette commande car elle est réservé au développeurs de ${bot.config.clients.name}**`)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo })

if (interaction.user.id === `310107091542999040`) {
            await interaction.reply({ embeds: [Shutting], ephemeral: true})
            await bot.user.setStatus("invisible")
            process.exit();
        } else {
            return interaction.reply({ embeds: [Denied], ephemeral: true})
        }
    }
}

module.exports = command