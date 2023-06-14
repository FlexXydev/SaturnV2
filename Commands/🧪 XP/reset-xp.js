const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');
const levelSchema = require ("../../Schemas/level");
const levelschema = require('../../Schemas/levelsetup');
const { avatarURL } = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription(`Reset something in this server.`)
    .setDMPermission(false)
    .addSubcommand(command => command.setName('all-xp').setDescription('Resets all XP progress in this server.'))
    .addSubcommand(command => command.setName('xp').setDescription(`Resets specified user's economy currency.`).addUserOption(option => option.setName('user').setDescription('Specified user will have their xp reset.').setRequired(true))),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
        const sub = interaction.options.getSubcommand();
        
        switch (sub) {

            case 'all-xp':

            const levelsetup = await levelschema.findOne({ Guild: interaction.guild.id });
            if (!levelsetup || levelsetup.Disabled === 'disabled') return await interaction.reply({ content: `The **Administrators** of this server **have not** set up the **leveling system** yet!`, ephemeral: true});

            levelSchema.deleteMany({ Guild: interaction.guild.id}, async (err, data) => {

                const embed = new EmbedBuilder()
                .setColor("Purple")
                .setTitle(`${interaction.guild.name}'s XP was reset`)
                .setAuthor({ name: `⬆ Level Playground  `})
                .setDescription(`> ${interaction.guild.name}'s XP has been set to **0**`)
                .setFooter({ text: '⬆ Level Reset Acknowledged'})
                .setTimestamp()
                .setThumbnail(avatarURL)
    
                await interaction.reply({ embeds: [embed] })
    
            })

            break;
            case 'xp':

            const levelsetup1 = await levelschema.findOne({ Guild: interaction.guild.id });
            if (!levelsetup1 || levelsetup1.Disabled === 'disabled') return await interaction.reply({ content: `The **Administrators** of this server **have not** set up the **leveling system** yet!`, ephemeral: true});

            const target = interaction.options.getUser('user');

            levelSchema.deleteMany({ Guild: interaction.guild.id, User: target.id}, async (err, data) => {

                const embed = new EmbedBuilder()
                .setColor("Purple")
                .setTitle(`${target.username}'s XP was reset`)
                .setAuthor({ name: `⬆ Level Playground  `})
                .setDescription(`> ${target.username}'s XP has been set to **0**`)
                .setFooter({ text: '⬆ Level Reset Acknowledged'})
                .setTimestamp()
                .setThumbnail(avatarURL)

                await interaction.reply({ embeds: [embed] })

            })

            break;
        }
    }
}