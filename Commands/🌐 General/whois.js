const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')   
        .setDescription(`Find information about a user in the guild`)
        .setDMPermission(false)
        .addUserOption(option => option 
            .setName('user')
            .setDescription(`The user you want to get information about`)
            .setRequired(false)
        ),
    async execute(interaction) {
        try {
            
                            // Change the emojis down below
                const badges = {
                    BugHunterLevel1: '<:discord_bughunterlv1:1110282666001039411> ',
                    BugHunterLevel2: '<:BugHunterLvl2:1110282860193124423>',
                    Partner: '<:icon_partneredserverowner:1110283176871460896>',
                    PremiumEarlySupporter: '<:discord_earlysupporter:1110283398599147551>',
                    Staff: '<:icon_discordstaff:1110283631475298304>',
                    VerifiedDeveloper: '<:Verified_Developer_Badge_Purple:1110284104055918604>',
                    ActiveDeveloper: '<:icon_activedeveloper:1110278056309964942>',
                };
    

                const user = interaction.options.getUser('user') || interaction.user;
                const member = await interaction.guild.members.fetch(user.id);
                const userAvatar = user.displayAvatarURL({ size: 32 });
                const userBadges = user.flags.toArray().map(badge => badges[badge]).join(' ') || 'None';
                const nick = member.displayName || 'None';
                const botStatus = user.bot ? 'Yes' : 'No';
            
            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Information`) 
                .setColor('Red')
                .setThumbnail(userAvatar)
                .addFields({
                    name: `<:join:1110271722717974689> Joined Discord`,
                    value: `<t:${parseInt(user.createdAt / 1000)}:R>`,
                    inline: true
                })
                .addFields({
                    name: `<:join:1110271722717974689> Joined Server`,
                    value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
                    inline: true
                })
                .addFields({
                    name: `<:booster_badge:1110271371788959785> Boosted Server`,
                    value: member.premiumSince ? 'Yes' : 'No',
                    inline: false
                })
                .addFields({ 
                    name: '<:bot:1110271018431434853> BOT',
                    value: botStatus,
                    inline: false
                })
                .addFields({ 
                        name: '<:verified_badge:1110272244162252940> Badges',
                        value: userBadges,
                        inline: false,
                 })
                .setTimestamp()
                .setFooter({ text: `User ID: ${user.id}`})

            await interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `An error occurred while executing the command.`, ephemeral: true});
        }
    }
}
