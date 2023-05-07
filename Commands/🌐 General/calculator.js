const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const math = require(`mathjs`)

 

module.exports = {

data: new SlashCommandBuilder()

    .setName('calculator')

    .setDescription('A fast cui based mathematical expression calculator.')

    .addStringOption((option) => 

        option.setName('expression')

        .setDescription('Your mathematical expression.')

        .setRequired(true)),

async execute(interaction) {

    const expression = interaction.options.getString('expression');

    try {

        const result = math.evaluate(expression);

        const embed = new EmbedBuilder()

            .setColor('Blue')

            .setTitle('Mathematical Calculator')

            .addFields({name: 'Expression', value: `\`${expression}\``},

            { name: 'Result', value: `\`${result}\``})

 

        await interaction.reply({ embeds: [embed] });

    } catch (error) {

        console.log(error)

        const errEmbed = new EmbedBuilder()

        .setColor(`Red`)

        .setTitle(`<:cross:1082334173915775046> Incorrect syntax.`)

        .setDescription(`Please use the correct operators and syntax.\nExample: \`162+115\`, \`256/12\`, \`192*18\``)

        await interaction.reply({embeds: [errEmbed], ephemeral: true});

    }

    }

};