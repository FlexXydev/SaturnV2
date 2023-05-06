const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChatInputCommandInteraction } = require('discord.js');
const { channelid, developerGuildID} = require('../../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bugreport")
    .setDescription("Report a bug to the bot developers")
    .addStringOption((option) =>
    option
        .setName("severity")
        .setDescription("Select the severity level of the bug")
        .addChoices(
            { name: "Low", value: "low" },
            { name: "Medium", value: "medium" },
            { name: "High", value: "high" }
        )
        .setRequired(true)
    ), 

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const severity = interaction.options.getString("severity");
        const reportModal = new ModalBuilder()
        .setTitle("Bug Report")
        .setCustomId("bugmodal");

        const titleInput = new TextInputBuilder()
        .setCustomId("bugtitle")
        .setLabel("Title")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("What bug you enconter ?")
        .setMaxLength(256)
        .setRequired(false);

        const descriptionInput = new TextInputBuilder()
        .setCustomId("bugdescription")
        .setLabel("Describe the bug")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

        const titleactionRow = new ActionRowBuilder().addComponents(titleInput);
        const descriptionactionRow = new ActionRowBuilder().addComponents(descriptionInput);

        reportModal.addComponents(titleactionRow, descriptionactionRow);

        try {
            await interaction.showModal(reportModal)
        } catch (error) {
            await interaction.reply({ content: "Somting went wrong", ephemeral: true })
        }

        const response = await interaction.awaitModalSubmit({ time: 300000 });
        const title = response.fields.getTextInputValue("bugtitle");
        const description = response.fields.getTextInputValue("bugdescription");

        await response.deferUpdate();

        let embedColor;
        if (severity === "low") {
            embedColor = "Yellow";
        } else if (severity === "medium") {
            embedColor = "Orange";
        } else {
            embedColor = "Red";
        }

        const embed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle(`${severity.toUpperCase()} Priority Bug Report`)
        .addFields(
            { name: "Title", value: title },
            { name: "Description", value: description },
            { name: "Reported By:", value: interaction.user.tag },
            { name: "Reported from:", value: interaction.guild.name }
        )
        .setTimestamp()

        const guildID = developerGuildID;
        const channelID = channelid;
        
        const guild = await interaction.client.guilds.fetch(guildID)
        const channel = client.channels.cache.get(channelID)

            await channel.send({ embeds: [embed] });
            await interaction.reply({ content: "Thank you for reporting the bug. Bug Report Submitted", ephemeral: true })
            console.error(`[${client.user.username}] `.green + error);
            await interaction.reply({ content: "Something went wrong. Try again later", ephemeral: true })
    }
}