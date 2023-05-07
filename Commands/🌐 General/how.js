const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require('../../config') 
 

module.exports = {

    data: new SlashCommandBuilder()

    .setName('how')

    .setDescription('Calculates how much of specified topic you are.')

    .addSubcommand(command => command.setName('gay').setDescription('Shows how gay you are, results are accurate.').addUserOption(option => option.setName('target').setDescription('Targets gay percentage'))),

    async execute(interaction) {
let target = interaction.options.getUser('target') || interaction.user;


 if (target.id === config. developperID) {
     
     const embed = new EmbedBuilder() 
    .setTitle(`> ${target.username} can not be gay! `)
    .addFields({ name: `• Why he can't be gay`, value: `> ${target} can't be gay because he is a 100% halal!`}) 
    .setTimestamp()
     .setThumbnail("https://steamuserimages-a.akamaihd.net/ugc/1817762107547034471/9247627F576A84BF50C7A1FBBE035E95D131DD27/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")

        .setAuthor({ name: `🌈 How Not Gay Tool`})

        .setFooter({ text: `🌈 Not Gay Percentage`})

        .setColor('Purple')
     
     const message = await interaction.reply({embeds: [embed], fetchReply: true
 })
     message.react('🗿') 
    } 
     

        const sub = interaction.options.getSubcommand();

        
        let randomizer = Math.floor(Math.random() * 101);

 
        const embed = new EmbedBuilder()

        .setTitle(`> How gay is ${target.username}?`)

        .setThumbnail(config.avatarURL)

        .setAuthor({ name: `🌈 How Gay Tool`})

        .setFooter({ text: `🌈 Gay Percentage`})

        .setColor('Purple')

        .addFields({ name: `• Percentage`, value: `> ${target} is ${randomizer}% **gay** 🍆`})

        .setTimestamp()

 

        const message = await interaction.reply({embeds: [embed], fetchReply: true
                                           });
        message.react('🤤') 

 

    }

}