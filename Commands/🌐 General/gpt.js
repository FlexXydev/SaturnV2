const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ask-gpt')
    .setDescription('Ask GPT a question')
    .addStringOption(option => option.setName('question').setDescription('The question to ask GPT').setRequired(true))
    .setDMPermission(false), 
    async execute (interaction) {
        
        await interaction.deferReply();

        const question = interaction.options.getString('question')

            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })

            const embed = new EmbedBuilder()
            .setTitle(`${question}`)
            .setColor('Random')
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.editReply({ embeds: [embed] })

        
    }
}