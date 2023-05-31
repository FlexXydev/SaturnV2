const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const Modlog = require('../../Schemas/modlog');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disablemodlog')
        .setDescription('Disables the mod log channel for this server.'),
        async execute(interaction) {
            const guildId = interaction.guild.id;
        
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }
        
            try {
                const modlog = await Modlog.findOne({ guildId });
                if (!modlog) {
                    return interaction.reply({ content: 'Mod log channel has not been set up yet.', ephemeral: true });
                }
        
                await Modlog.findOneAndDelete({ guildId });
        
                return interaction.reply(`Mod log channel disabled.`);
            } catch (error) {
                console.error(error);
                return interaction.reply('An error occurred while disabling the mod log channel');
            }
        },
};