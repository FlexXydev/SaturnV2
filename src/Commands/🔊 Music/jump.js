const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "music-jump",
        this.description = "Permets de passer à un nombre de musique spécifique dans la file d'attente.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: ApplicationCommandOptionType.Number,
                name: "nombre",
                description: "Écrivez le nombre de musique",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const queue = bot.player.nodes.get(interaction.guild)
        const nombre = parseInt(interaction.options.getNumber('nombre'))

        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        await interaction.deferReply();
 
        try {
            if(!queue || !queue.isPlaying()) return interaction.followUp({ embeds: [Embed.setDescription(`❌ | Aucune musique en cours de lecture 🔊`)] });

            queue.node.jump(nombre - 1)

            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | ${nombre} musique passé avec succès 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command