const { EmbedBuilder, PermissionsBitField } = require('discord.js');

class command {
    constructor() {
        this.name = "clear",
        this.description = "Permets de supprimer un certain nombre de messages.",
        this.category = "💎 Modération",
        this.permission = "Gérer les messages",
        this.options = [
            { 
                type: 10, 
                name: "nombre", 
                description: "Nombre (1-99).", 
                required: true 
            },
            { 
                type: 6, 
                name: "membre", 
                description: "Sélectionner un membre", 
                required: false
            },
        ]
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('👮‍♂️ **Action de modération**')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});

        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const args = interaction.options.getNumber('nombre');
            const user = interaction.options.getMember('membre');

            if(user) {
                const Channel = interaction.channel;
                const Messages = Channel.messages.fetch()
                const TargetMessages = (await Messages).filter((m) => m.author.id === user.id);

                await Channel.bulkDelete(TargetMessages, true).then((msg) => {
                    interaction.reply({ embeds: [Embed.setDescription(`✅ | **Clear de ${args} messages du membre ${user.toString()}** !`)], ephemeral: false });
                }).catch((err) => {
                    interaction.reply({ embeds: [Embed.setDescription(`❌ | **J'ai rencontré une erreur : ${err}**`)], ephemeral: true })
                });
            } else if(args >= 1 && args <= 100){
                await interaction.channel.bulkDelete(args, true).then((msg) => {
                    interaction.reply({ embeds: [Embed.setDescription(`✅ | **Clear de ${args} messages** !`)], ephemeral: false });
                }).catch((err) => {
                    interaction.reply({ embeds: [Embed.setDescription(`❌ | **J'ai rencontré une erreur : ${err}**`)], ephemeral: true })
                });
            } else {
                interaction.reply({ embeds: [Embed.setDescription(`❌ | **Tu n'as pas spécifié un nombre -> (1-99)** !`)], ephemeral: false });
            }
        } else {
            interaction.reply({ embeds: [Embed.setDescription(`❌ | **Tu n'as pas la permission d'exécuter cette commande** !`)], ephemeral: false });
        }
    }
}

module.exports = command