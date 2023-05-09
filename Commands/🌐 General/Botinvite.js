const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js'); 
const config = require('../../config')
  

 module.exports = {

  data: new SlashCommandBuilder()

    .setName('invite-me')

    .setDescription('Invite this bot to your server. '),

  async execute (interaction, client) {

         const embed = new EmbedBuilder() 

         .setColor('Random') 
        .setTitle(`Invite ${client.user.username} to your discord server`)

         .setDescription('Invite me to your discord server !') 
.setThumbnail(config.avatarURL)
         .setTimestamp() 

         .setFooter({ text: client.user.username , iconURL: config.avatarURL }) 

  

         var row = new ActionRowBuilder() 

             .addComponents(new ButtonBuilder() 

                 .setEmoji('📃') 

                 .setLabel('Invite-me') 

                 .setURL(`https://discord.com/api/oauth2/authorize?client_id=945224613057683516&permissions=8&scope=bot`) 

                 .setStyle(ButtonStyle.Link) 

             ); 

  

         interaction.reply({ embeds: [embed], components: [row] }); 

     } 

 }