const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config')
 

module.exports = {

    data: new SlashCommandBuilder()

        .setName('stats')

        .setDescription('Statistics of the discord bot'),

    async execute(interaction, client) {

                const icon = config.avatarURL
                const totalMembers = await interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
                const embed = new EmbedBuilder()

                  .setColor("Purple")

                  .setThumbnail(`${icon}`)

                  .setDescription(`⚒️ Statistics of **${client.user.username}**` )

                  .addFields({ name: "** **", value: `** **`, inline: false})

                  .addFields({ name: "🤖 Commands:", value: `${client.commands.size}`, inline: true})

                  .addFields({ name: "👨‍👩‍👧‍👦 Users:", value: `${totalMembers}`, inline: true})

                  .addFields({ name: "🌎 Servers:", value: `${client.guilds.cache.size}`, inline: true})

                  .addFields({ name: "💬 Channels:", value: `${client.channels.cache.size}`, inline: true})

                  .addFields({ name: "📅 Created:", value: `<t:${parseInt(client.user.createdTimestamp / 1000,10)}:R>`, inline: true})

                  .addFields({ name: "🏓 Ping", value: `${client.ws.ping}ms`, inline: true})

                  .addFields({ name: "⏰ Up Time", value: `<t:${parseInt(client.readyTimestamp / 1000,10)}:R>`, inline: true})

                  .addFields({ name: "💳 ID ", value: `${client.user.id}`, inline: true})

                  .addFields({ name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed /1024 /1024).toFixed(2)}%`, inline: true})

                  .setFooter({ text: `${client.user.username} 2023 - 2023` })

 

    await interaction.reply({ embeds: [embed], ephemeral: false });

            

    },

};