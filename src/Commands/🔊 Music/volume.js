const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "music-volume",
        this.description = "Permets de modifier le volume de la musique actuellement jouer.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: ApplicationCommandOptionType.Number,
                name: "volume",
                description: "Écrivez le volume souhaiter (entre 1-99)",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const queue = bot.player.nodes.get(interaction.guild)
        const volume = parseInt(interaction.options.getNumber('volume'))
        const MaxVolume = bot.config.opt.maxVol

        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        await interaction.deferReply();
 
        try {
            if(!queue || !queue.isPlaying()) return interaction.followUp({ embeds: [Embed.setDescription(`❌ | Aucune musique en cours de lecture 🔊`)] });
            if(!volume) return interaction.followUp({ embeds: [Embed.setDescription(`🎧 | Le volume actuel est de **${queue.node.volume}**/**${MaxVolume}**% 🔊`)] });
            if(queue.node.volume === volume) return interaction.followUp({ embeds: [Embed.setDescription(`❌ | Le volume que vous souhaitez modifier est déjà celui actuellement utilisé 🔊`)] });
            if(volume < 0 || volume > MaxVolume) return interaction.followUp({ embeds: [Embed.setDescription(`❌ | Le nombre spécifié n'est pas valide, entrez un nombre entre **1**/**${MaxVolume}**% 🔊`)] });

            queue.node.setVolume(volume)
     
            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Le volume à été modifier par **${volume}**/**${MaxVolume}**% 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command