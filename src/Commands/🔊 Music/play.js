const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "music-play",
        this.description = "Permets de démarrer une musique.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: ApplicationCommandOptionType.String,
                name: "music",
                description: "Écrivez le titre d'une musique",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const channel = interaction.member.voice.channel;
        const args = interaction.options.getString('music');

        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        await interaction.deferReply();
 
        try {
            const { track } = await bot.player.play(channel, args, {
                nodeOptions: {
                    metadata: interaction
                }
            });
     
            return interaction.followUp({ embeds: [Embed.setDescription(`✅ | La musique **${track.title}** as bien été trouvé 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [Embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}

module.exports = command