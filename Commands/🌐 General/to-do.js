const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
} = require("discord.js");
const Schema = require("../../Schemas/todoSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todo")
        .setDescription("Manage your current to-do list.")
        .setDMPermission(false)
        .addSubcommand(command =>
            command.setName("add")
                .setDescription("Create a to-do list task.")
                .addStringOption(option =>
                    option.setName("task")
                        .setDescription("*Description of your to-do task.")
                        .setRequired(true)
                        .setMaxLength(256)
                )
        )
        .addSubcommand(command =>
            command.setName("list")
                .setDescription("List all your to-do list tasks.")
        )
        .addSubcommand(command =>
            command.setName("remove")
                .setDescription("Remove your current to-do list tasks.")
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        let Data = await Schema.findOne({ User: interaction.user.id });

        switch (sub) {
            case "add": {
                const task = interaction.options.getString("task");
                const date = Date.now();

                try {
                    await Schema.create({
                        User: interaction.user.id,
                        Message: task,
                        MessageDate: date,
                    });

                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Green")
                                .setDescription(":white_check_mark: | Successfully added a new task to your to-do list.")
                                .addFields(
                                    { name: "Task", value: `${task}` }
                                )
                        ]
                    })
                } catch (err) {
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Yellow")
                                .setDescription(":warning: | Something went wrong. Please try again later.")
                        ],
                        ephemeral: true
                    })
                }
            }
                break;
            case "list": {
                if (!Data) return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Yellow")
                            .setDescription(":warning: | You have no to-do list tasks. Create one using \`/todo add\`.")
                    ],
                    ephemeral: true
                })
                else {
                    const timestamp = Math.floor(Data.MessageDate / 1000)
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("#2b2d31")
                                .setDescription(`Here is ${interaction.user.username}'s current to-do list.`)
                                .addFields(
                                    { name: "Task", value: `${Data.Message}`, inline: true },
                                    { name: "Date", value: `<t:${parseInt(timestamp)}:R>`, inline: true }
                                )
                                .setAuthor({
                                    name: interaction.user.tag,
                                    iconURL: interaction.user.displayAvatarURL(),
                                })
                        ]
                    })
                }
            }
                break;
            case "remove": {
                if (!Data) return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Yellow")
                            .setDescription(":warning: | You have no to-do list tasks. Create one using \`/todo add\`.")
                    ],
                    ephemeral: true
                })
                else {
                    try {
                        await Schema.deleteMany({ User: interaction.user.id });

                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Green")
                                    .setDescription(":white_check_mark: | Your to-do list has been cleared. You may create a new task using \`/todo add\`.")
                            ]
                        })
                    } catch (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Yellow")
                                    .setDescription(":warning: | Something went wrong. Please try again later.")
                            ],
                            ephemeral: true
                        })
                    }
                }
            }
                break;
        }
    }
}