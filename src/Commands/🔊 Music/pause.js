const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "music-pause",
        this.description = "Permets de mettre la musique actuellement jouer en pause.",
        this.category = "🔊 Music",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        const queue = bot.player.nodes.get(interaction.guild)

        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        await interaction.deferReply();
 
        try {
            if(!queue || !queue.isPlaying()) return interaction.followUp({ embeds: [Embed.setDescription(`❌ | Aucune musique en cours de lecture 🔊`)] });

            queue.node.setPaused(true)
     
            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | La musique as bien été mis en pause 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command