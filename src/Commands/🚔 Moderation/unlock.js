const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

class command {
    constructor() {
        this.name = "unlock",
        this.description = "Permet d'ouvrir un salon textuel .",
        this.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Quel salon voulez-vous ouvrir ?",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {

        // erreur a has
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: "Tu n'a pas la permission d'executer cette commande", ephemeral: true })

        let channel = interaction.options.getChannel('channel');

        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: true })

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`:white_check_mark: ${channel} est désormais ouvert !`)
        .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}

module.exports = command