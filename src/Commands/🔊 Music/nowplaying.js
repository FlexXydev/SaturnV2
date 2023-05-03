const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "music-nowplaying",
        this.description = "Permets d'afficher des informations sur la musique en cours de lecture.",
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

            const progress = queue.node.createProgressBar()

            const methods = ['Désactivé', 'Musique', 'Fil d\'attente', 'Lecture automatique'];

            return interaction.followUp({
                embeds: [
                    Embed
                    .setDescription(`Nom : [${queue.currentTrack.title}](${queue.currentTrack.url})\nVolume : **${queue.node.volume}%**\nDurée : **${progress.replace(/ 0:00/g, 'LIVE')}**\nMode répétition : **${methods[queue.repeatMode]}**`)
                    .setThumbnail(`${queue.currentTrack.thumbnail}`)
                ]
            });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command