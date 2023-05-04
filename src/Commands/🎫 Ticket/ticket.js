  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType, ApplicationCommandOptionType } = require('discord.js');
  const TicketSetup = require('../../Schemas/Ticketsetup');
  
  
  class command {
    constructor() {
        this.name = "ticket-setup",
        this.description = "Sert à setup le système de ticket.",
        this.options = [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Dans quel salon voulez vous envoyer l'embed ?",
                required: true,
                ChannelTypes : ChannelType.GuildText
            },
            {
              type: ApplicationCommandOptionType.Channel,
              name: "catégorie",
              description: "Veuillez renseigner l'id de la catégorie.",
              required: true,
              ChannelTypes : ChannelType.GuildText
          },
            {
                type: ApplicationCommandOptionType.Channel,
                name: "transcripts",
                description: "Dans quel salon voulez vous recevoir les transcripts ?",
                required: true,
                ChannelTypes : ChannelType.GuildText
            },
            {
              type: ApplicationCommandOptionType.Role,
              name: "role",
              description: "Quel rôle voulez vous qu'il soit mentionné dans un ticket ?",
              required: true,
          },
          {
            type: ApplicationCommandOptionType.Role,
            name: "everyone",
            description: "Sélectionnez le rôle @everyone.",
            required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "description",
          description: "Mettez une description pour l'embed du ticket.",
          required: true
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "button",
        description: "Mettez ce qu'il sera écrit dans le boutton. Recommandation : Créez votre ticket.",
        required: true
    },
      {
        type: ApplicationCommandOptionType.String,
        name: "emoji",
        description: "Choisisez un emoji.",
        required: true
    },
        ]
    }
    async execute(bot, interaction) {
      const { guild, options } = interaction;
      try {
        const channel = options.getChannel('channel');
        const category = options.getChannel('catégorie');
        const transcripts = options.getChannel('transcripts');
        const handlers = options.getRole('role');
        const everyone = options.getRole('everyone');
        const description = options.getString('description');
        const button = options.getString('button');
        const emoji = options.getString('emoji');

        await TicketSetup.findOneAndUpdate(
          { GuildID: guild.id },
          {
            Channel: channel.id,
            Category: category.id,
            Transcripts: transcripts.id,
            Handlers: handlers.id,
            Everyone: everyone.id,
            Description: description,
            Button: button,
            Emoji: emoji,
          },
          {
            new: true,
            upsert: true,
          }
        );
        const embed = new EmbedBuilder().setDescription(description);
        const buttonshow = new ButtonBuilder()
          .setCustomId(button)
          .setLabel(button)
          .setEmoji(emoji)
          .setStyle(ButtonStyle.Primary);
        await guild.channels.cache.get(channel.id).send({
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents(buttonshow)],
        }).catch(error => {return});
        return interaction.reply({ embeds: [new EmbedBuilder().setDescription('The ticket panel was successfully created.').setColor('Green')], ephemeral: true});
      } catch (err) {
        console.log(err);
        const errEmbed = new EmbedBuilder().setColor('Red').setDescription('Veuillez réessayer plus tard.');
        return interaction.reply({ embeds: [errEmbed], ephemeral: true }).catch(error => {return});
      }
    }
  }
  module.exports = command
  