  const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType} = require('discord.js');
  const TicketSetup = require('../../Schemas/TicketSetup');
  const config = require('../../config');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('ticket')
      .setDescription('A command to setup the ticket system.')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('Select the channel where the tickets should be created.')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      )
      .addChannelOption((option) =>
        option
          .setName('category')
          .setDescription('Select the parent where the tickets should be created.')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildCategory)
      )
      .addChannelOption((option) =>
        option
          .setName('transcripts')
          .setDescription('Select the channel where the transcripts should be sent.')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      )
      .addRoleOption((option) =>
        option
          .setName('handlers')
          .setDescription('Select the ticket handlers role.')
          .setRequired(true)
      )
      .addRoleOption((option) =>
        option
          .setName('everyone')
          .setDescription('Select the everyone role.')
          .setRequired(true)
      )
       .addStringOption((option) =>
        option
          .setName('title')
          .setDescription('Choose a title for the ticket embed.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('description')
          .setDescription('Choose a description for the ticket embed.')
          .setRequired(true)
      )
      .addStringOption(option => option
        .setName("color")
        .setDescription("The color of the embed")
        .setRequired(true)
        .addChoices(
            {name: "aqua", value: "#00FFFF"},
            {name: "blurple", value: "#7289DA"},
            {name: "fuchsia", value: "#FF00FF"},
            {name: "gold", value: "#FFD700"},
            {name: "green", value: "#008000"},
            {name: "grey", value: "#808080"},
            {name: "greyple", value: "#7D7F9A"},
            {name: "light-grey", value: "#D3D3D3"},
            {name: "luminos-vivid-pink", value: "#FF007F"},
            {name: "navy", value: "#000080"},
            {name: "not-quite-black", value: "#232323"},
            {name: "orange", value: "#FFA500"},
            {name: "purple", value: "#800080"},
            {name: "red", value: "#FF0000"},
            {name: "white", value: "#FFFFFF"},
            {name: "yellow", value: "#FFFF00"},
            {name: "blue", value: "#0000FF"}
        )
    )
      .addStringOption((option) =>
        option
          .setName('button')
          .setDescription('Choose a name for the ticket embed.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('emoji')
          .setDescription('Choose a style, so choose a emoji.')
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('thumbnail')
          .setDescription('Put here an image link for the ticket embed.')
          .setRequired(false)
      ),
    async execute(interaction) {
      const { guild, options } = interaction;
      try {
        const channel = options.getChannel('channel');
        const category = options.getChannel('category');
        const transcripts = options.getChannel('transcripts');
        const handlers = options.getRole('handlers');
        const everyone = options.getRole('everyone');
        const title = options.getString('title');
        const description = options.getString('description');
        const thumbnail = options.getString('thumbnail');
        const button = options.getString('button');
        const emoji = options.getString('emoji');
        const color = options.getString('color')
        await TicketSetup.findOneAndUpdate(
          { GuildID: guild.id },
          {
            Channel: channel.id,
            Category: category.id,
            Transcripts: transcripts.id,
            Handlers: handlers.id,
            Everyone: everyone.id,
            Description: description,
            Thumbnail: thumbnail,
            Title: title,
            Color: color,
            Button: button,
            Emoji: emoji,
          },
          {
            new: true,
            upsert: true,
          }
        );
        const embed = new EmbedBuilder().setDescription(description).setTitle(title).setColor(color).setThumbnail(`${thumbnail}`);
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
        const errEmbed = new EmbedBuilder().setColor('Red').setDescription(config.ticketError);
        return interaction.reply({ embeds: [errEmbed], ephemeral: true }).catch(error => {return});
      }
    },
  };
  