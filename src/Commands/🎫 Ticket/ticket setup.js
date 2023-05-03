const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, ActionRowBuilder } = require("discord.js");
const ticketSchema = require('../../Schemas/ticket');

class command {
    constructor() {
        this.name = "ticket-setup",
        this.description = "Sert à setup le système de ticket.",
        this.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Dans quel salon voulez vous envoyer l'embed ?",
                required: true
            },
            {
              type: ApplicationCommandOptionType.Channel,
              name: "catégorie",
              description: "Veuillez renseigner l'id de la catégorie.",
              required: true
          },
            {
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "Quel rôle voulez vous qu'il soit mentionné dans un ticket ?",
                required: true
            },
        ]
    }
    async execute(bot, interaction) {

        const channelse = interaction.options.getChannel('channel')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "Tu n'a pas la permission d'executer cette commande", ephemeral: true })
        const categoryChannel = interaction.options.getChannel('catégorie');
        const categoryId = categoryChannel ? categoryChannel.id : null;
        
        if (categoryId) {
          const cleanedCategoryId = categoryId.replace(/[#]/g, '');
          console.log("L'ID de la catégorie nettoyé est : ", cleanedCategoryId);
        
          const data = await ticketSchema.findOne({
            GuildID: interaction.guild.id,
            GuildName: interaction.guild.name,
            Channel: interaction.options.getChannel('channel'),
            Category: cleanedCategoryId,
            Role: interaction.options.getRole('role')
          });

          if (!data) {
            ticketSchema.create({
              GuildID: interaction.guild.id,
              GuildName: interaction.guild.name,
              Channel: interaction.options.getChannel('channel'),
              Category: cleanedCategoryId,
              Role: interaction.options.getRole('role')
            });
          } if (data) {
              console.log(data);

              const categoryValue = data.Category;

              var row = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setEmoji('💌')
                    .setLabel('Créer un ticket')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('button')
                );
  
              const embed = new EmbedBuilder()
              .setColor('Green')
              .setTitle('Tickets & Support')
              .setDescription('Cliquez sur le boutton en dessous pour parler à un staff !')
  
              
  
              interaction.reply({ content: "L'embed à bel et bien été envoyé !", ephemeral: true })
              channelse.send({ embeds: [embed], components: [row] })
  
                const collector = await interaction.channel.createMessageComponentCollector();
  
                collector.on('collect', async i => {
  
                  await i.update({ embeds: [embed], components: [row] })
                  const channel = await interaction.guild.channels.create({
                      name: `Ticket-${i.user.tag}`,
                      type: ChannelType.GuildText,
                      parent: categoryValue
                  });
  
                  channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true });
                  channel.permissionOverwrites.create(channel.guild.roles.everyone, {ViewChannel: false, SendMessages: false });
  
                  channel.send({ content: `Bienvenue dans votre ticket @${i.user.tag} !`})
                  i.user.send(`Votre ticket dans ${i.guild.name} a été créé. Vous pouvez le voir dans ${channel}.`).catch(err => {return})
                })
  
  
            }
        }
    }

};

module.exports = command