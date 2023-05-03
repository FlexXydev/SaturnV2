const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

class command {
    constructor() {
        this.name = "music-loop",
        this.description = "Permets de passer la file d'attente en plusieur mode.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: ApplicationCommandOptionType.String,
                name: "choix",
                description: "Veuillez choisir le mode",
                required: true,
                choices: [
                    { name: '❌ Aucun', value: 'off' },
                    { name: '🎧 Boucler la musique', value: 'musique' },
                    { name: '🎧 Boucler la file d\'attente', value: 'queue' },
                    { name: '🎧 Lecture automatique', value: 'autoplay' }
                ]
            },
        ]
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

            if (interaction.options.getString('choix') == 'off'){
                queue.setRepeatMode(QueueRepeatMode.OFF)
                return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Le mode boucle à été mis sur **Aucun** 🔊`)] });
            } else if (interaction.options.getString('choix') == 'musique'){
                queue.setRepeatMode(QueueRepeatMode.TRACK)
                return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Le mode boucle à été mis sur la **Musique** 🔊`)] });
            } else if (interaction.options.getString('choix') == 'queue'){
                queue.setRepeatMode(QueueRepeatMode.QUEUE)
                return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Le mode boucle à été mis sur la **File d'attente** 🔊`)] });
            } else if (interaction.options.getString('choix') == 'autoplay'){
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY)
                return interaction.followUp({ embeds: [Embed.setDescription(`✅ | Le mode boucle à été mis sur **Lecture automatique** 🔊`)] });
            }
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command