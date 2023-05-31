const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const Modlog = require('../../Schemas/modlog');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmodlog')
        .setDescription('Sets up the mod log channel for this server.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set as the mod log channel').setRequired(true)),
        async execute(interaction) {
          const guildId = interaction.guild.id;
          const logChannelId = interaction.options.getChannel('channel').id;
          
          if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
              return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
          }
      
          try {
              let modlog = await Modlog.findOne({ guildId });
              if (modlog) {
                  return interaction.reply({ content: 'A mod log channel has already been set up for this server.', ephemeral: true });
              }
              
              modlog = await Modlog.findOneAndUpdate(
                  { guildId },
                  { logChannelId },
                  { upsert: true }
              );
      
              return interaction.reply(`Mod log channel set to <#${logChannelId}>`);
          } catch (error) {
              console.error(error);
              return interaction.reply('An error occurred while setting up the mod log channel');
          }
      }
 };