const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "music-back",
        this.description = "Permets de jouer l'ancienne musique.",
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

            const lastSong = queue.history.previousTrack
            await queue.history.previous()
            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Je rejoue l'ancienne musique [**${lastSong.title}**](${lastSong.url}) 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command