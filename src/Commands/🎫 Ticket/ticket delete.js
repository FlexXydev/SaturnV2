const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "ticket-delete",
        this.description = "Permets de supprimer un ticket.",
        this.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Quel salon voulez vous supprimer ?",
                required: true
            }
        ]
    }

    async execute(bot, interaction) {

        const channel = interaction.options.getChannel('channel');
        const channeldelete = await interaction.guild.channels.cache.get(channel.id);
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "Tu n'a pas la permission d'executer cette commande", ephemeral: true })

        await channeldelete.delete().catch(err => {
            return interaction.reply({ content: `**Couldn't** delete that channel! Check my **permissions** and try again.`})
        });


        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription('Channel supprimé !')
        .setDescription(`Le channel ${channel} a bien été supprimé !`)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo })


        interaction.reply({ embeds: [embed] });
    }
}

module.exports = command