const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription("Generates and provides the user's IQ")
    .addUserOption(option => 

      option.setName('user')

      .setDescription('Check the IQ of a user')

      .setRequired(false)

    ),
    async execute(interaction) {
        
        let user =  interaction.options.getUser('user') || interaction.user
        
        const minIQ = 20;
        const maxIQ = 200;
        const randomIQ = Math.floor(Math.random() * (maxIQ - minIQ + 1)) + minIQ;
        let message = `${user} IQ is ${randomIQ}.`;
        
        if (randomIQ >= 80) {
            message = `${user} IQ is high **${randomIQ}** You're a genius! 🧠`;
        } else if (randomIQ <= 50) {
            message = `${user} IQ is low **${randomIQ}** Keep learning and growing! 📚`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s IQ Result`)
            .setDescription(message)
            .setColor('Green');

        await interaction.reply({ embeds: [embed] });
    },
};
