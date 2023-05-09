const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('lock')
      .setDescription('A command to lock a specific channel.')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('Select the channel where you want to lock the channel.')
          .setRequired(false)
          .addChannelTypes(ChannelType.GuildText)
      ),
      async execute(interaction) {

        let channel = interaction.options.getChannel('channel');

        channel.permissionOverwrites.create(interaction.guild.id, { SendMessages: false })

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`:white_check_mark: ${channel} est désormais fermé !`)
        .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }

}