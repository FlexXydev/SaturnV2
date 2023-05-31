const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { avatarURL } = require('../../config')



module.exports = {

    data: new SlashCommandBuilder()

    .setName("leave-guild")

    .setDescription("make the bot leave a server")

    .addStringOption(option =>

      option.setName("guildid")

          .setDescription("guildid")

          .setRequired(true)

    ),

                   

    async execute(interaction, client) {



        const botOwnerId = '310107091542999040';



        const ownerOnly = new EmbedBuilder()

        .setTitle(`• This Command is LOCKED`)

        .setColor('Red')

        .setThumbnail(avatarURL)



        if(interaction.member.id !== botOwnerId) return interaction.reply({ embeds: [ownerOnly], ephemeral: true})



        const leavingEmbed = new EmbedBuilder()



        .setTitle(`• Leaving Server`)

        .setColor('Blue')

        .setThumbnail(avatarURL)



        await interaction.reply({ embeds: [leavingEmbed], ephemeral: true })



        const guildid = interaction.options.getString("guildid");



        const guild = client.guilds.cache.get(guildid)



        const errEmbed = new EmbedBuilder()

        .setTitle(`• Error! Bot is NOT in the server!`)

        .setColor('Red')

        .setThumbnail(avatarURL)



        if (!guild) await interaction.editReply({ embeds: [errEmbed], ephemeral: true })

        else {

            await guild.leave().catch(err => {

                return interaction.editReply({ embeds: [errEmbed], ephemeral: true });

            });

            const successEmbed = new EmbedBuilder()

            .setTitle(`• Left Server`)

            .setColor('Green')

            .setThumbnail(avatarURL)



            await interaction.editReply({ embeds: [successEmbed], ephemeral: true })

        }

    }

}