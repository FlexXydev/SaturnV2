const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "music-resume",
        this.description = "Permets de retirer la musique actuellement jouer de pause.",
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

            queue.node.setPaused(false)
     
            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | La musique as bien été retiré de pause 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command