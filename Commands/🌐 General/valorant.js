const axios = require('axios')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mmr")
    .setDescription("mmr of valorant")
    .addStringOption((opt) => opt
    .setName("profile").setDescription("Your profile").setRequired(true))
    .addStringOption((opt) => opt
    .setName("tag").setDescription("Your tag").setRequired(true))
    .addStringOption((opt) => opt
    .setName("region").setDescription("Your region").addChoices(
        { name: "na", value: "na" },
        { name: "latam", value: "latam" },
        { name: "eu", value: "eu" },
        { name: "ap", value: "ap" },
        { name: "kr", value: "kr" },
        { name: "br", value: "br" }
    ).setRequired(true)),
    async execute(interaction, client) {
        try{
        const profile = interaction.options.getString("profile")
        const tag = interaction.options.getString("tag")
        const region = interaction.options.getString("region")
            const response = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${profile}/${tag}`)

            const embed = new EmbedBuilder()
            .setTitle(`${profile}'s MMR`)
            .setAuthor({ name: `${profile}#${tag}`})
            .setDescription(`
            Rank: **${response.data.data.currenttierpatched}**
            Current MMR: **${response.data.data.ranking_in_tier} / 100**
            Last MMR Change: **${response.data.data.mmr_change_to_last_game}**
            Current Elo: **${response.data.data.elo}**
            `)
            .setColor('Random')
            interaction.reply({ embeds: [embed]})
    } catch(e){
        console.log(e)
        interaction.reply({ content: "The user hasn't playing a ranked match in the last 20 matches | cannot find the user."})
    }
    }
}