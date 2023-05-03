const  { EmbedBuilder } = require('discord.js');

class command {

    constructor() {

        this.name = "stats",

        this.description = "Affiche toutes les statistique du bot."

    }
    async execute(bot, interaction ) {

  

                const icon = bot.config.clients.logo
                
                const totalMembers = await interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

                const embed = new EmbedBuilder()
                  .setColor('Random')
                  .setThumbnail(`${icon}`)
                  .setDescription(`⚒️ Statistics of **${bot.user.username}**` )
                  
                  .addFields({ name: "🤖 Commands:", value: `${bot.commands.size}`, inline: true})
                  .addFields({ name: "👨‍👩‍👧‍👦 Users:", value: `${totalMembers}`, inline: true})
                  .addFields({ name: "🌎 Servers:", value: `${bot.guilds.cache.size}`, inline: true})
                  .addFields({ name: "💬 Channels:", value: `${bot.channels.cache.size}`, inline: true})
                  .addFields({ name: "📅 Created:", value: `<t:${parseInt(bot.user.createdTimestamp / 1000,10)}:R>`, inline: true})
                  .addFields({ name: "🏓 Ping", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true})
                  .addFields({ name: "⏰ Up Time", value: `<t:${parseInt(bot.readyTimestamp / 1000,10)}:R>`, inline: true})
                  .addFields({ name: "💳 ID ", value: `${bot.user.id}`, inline: true})
                  .addFields({ name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed /1024 /1024).toFixed(2)}%`, inline: true})
                  .setFooter({ text: `${bot.user.username} 2023 - 2023` })

    await interaction.reply({ embeds: [embed], ephemeral: false });
            
    }
};
module.exports = command