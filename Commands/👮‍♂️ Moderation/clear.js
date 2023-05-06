const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('This clears channel messages. Cannot delete any messages older than 14 days.')
    .addIntegerOption(option => option.setName('amount').setDescription(`The amount of messages to delete`).setMinValue(1).setMaxValue(100).setRequired(true)),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You dont have the permission to execute this command", ephemeral: true })

        let number = interaction.options.getInteger('amount');

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`:white_check_mark: Deleted ${number} messages`)

        await interaction.channel.bulkDelete(number)

        await interaction.reply({ embeds: [embed]});

                setTimeout(() => {

                    interaction.deleteReply();

                }, 5000);

    }
}