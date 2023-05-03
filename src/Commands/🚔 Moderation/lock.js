const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");

class command {
    constructor() {
        this.name = "lock",
        this.description = "Permet de fermer un salon textuel .",
        this.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Quel salon voulez-vous fermer ?",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {


        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: "Tu n'a pas la permission d'executer cette commande", ephemeral: true })

        let channel = interaction.options.getChannel('channel');

        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`:white_check_mark: ${channel} est désormais fermé !`)
        .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}

module.exports = command