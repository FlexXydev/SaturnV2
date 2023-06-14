const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {

  data: new SlashCommandBuilder()

    .setName('guilds')

    .setDescription('Displays all the servers the bot is in'),

  async execute(interaction, client) {

    if (interaction.user.id !== '310107091542999040') {

      return interaction.reply('**You do not have permission to do this!**').then(e => {

        setTimeout(() => e.delete(), 4000);

      });

    }

    const guilds = client.guilds.cache.map(guild  => `\n${guild.name}(${guild.id}), ${guild.memberCount} Members\n<@${guild.ownerId}>.\n`);

    let memberCount = 0; 

    client.guilds.cache.forEach((guild) => {

      memberCount += guild.memberCount;

    });

    const embed = new EmbedBuilder()

      .setTitle(`${client.user.username} is in ${client.guilds.cache.size} Guilds`) //change the ${client.config.client.name} to your bot name

      .setDescription(`Guilds list \n${guilds}`)

      .setColor('Random');

    await interaction.reply({ embeds: [embed] });

  },

};

