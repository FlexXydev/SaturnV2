const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { getMatrixDataTypeDependencies } = require('mathjs');
const levelSchema = require('../../Schemas/level');
const levelschema = require('../../Schemas/levelsetup');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('give')
    .setDMPermission(false)
    .setDescription('Give a user specified amount of currency.')
    .addSubcommand(command => command.setName('xp').setDescription('Give specified user specified amount of XP.').addUserOption(option => option.setName('user').setDescription('Specified user will be given specified amount of XP.').setRequired(true)).addNumberOption(option => option.setName('amount').setDescription('The amount of XP you want to give specified user.').setRequired(true).setMaxValue(10000000).setMinValue(10))),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
        const sub = interaction.options.getSubcommand();

        switch (sub) {

        case 'xp':

        const levelsetup = await levelschema.findOne({ Guild: interaction.guild.id });
        if (!levelsetup || levelsetup.Disabled === 'disabled') return await interaction.reply({ content: `The **Administrators** of this server **have not** set up the **leveling system** yet!`, ephemeral: true});

        const xpuser = interaction.options.getUser('user');
        const xpamount = interaction.options.getNumber('amount');

        levelSchema.findOne({ Guild: interaction.guild.id, User: xpuser.id}, async (err, data) => {

            if (err) throw err;
    
            if (!data) return await interaction.reply({ content: `${xpuser} needs to have **earned** past XP in order to add to their XP.`, ephemeral: true})

            const give = xpamount;

            const Data = await levelSchema.findOne({ Guild: interaction.guild.id, User: xpuser.id});

            if (!Data) return;
            
            Data.XP += give;
            Data.save();

            interaction.reply({ content: `Gave **${xpuser.username}** **${xpamount}**XP.`, ephemeral: true})
        })
        }
    }
}