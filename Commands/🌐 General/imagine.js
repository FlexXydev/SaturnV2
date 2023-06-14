const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require('openai')
const { openaikey } = require('../../config')

const configuration = new Configuration({
    apiKey: openaikey,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('imagine')
    .setDescription('Generate an image')
    .addStringOption(option => option.setName('prompt').setDescription('The question to generate').setRequired(true))
    .setDMPermission(false), 
    async execute (interaction) {
        
        await interaction.deferReply();

        const prompt = interaction.options.getString('prompt')

            const res = await openai.createImage({
				n:1,
                size: "256x256",
                prompt: prompt
            })

            const embed = new EmbedBuilder()
            .setTitle(`${prompt}`)
            .setColor('Random')
            .setImage(`${res.data.data[0].url}`)

            await interaction.editReply({ embeds: [embed] })

        
    }
}