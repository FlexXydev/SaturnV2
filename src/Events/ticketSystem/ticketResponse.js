const {ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits} = require('discord.js');
const TicketSchema = require('../../Schemas/Ticket');
const TicketSetup = require('../../Schemas/Ticketsetup');

module.exports = {
    name: 'interactionCreate',
    async execute(bot, interaction) {
        const {guild, member, customId, channel} = interaction;
        const {ViewChannel, SendMessages, ManageChannels, ReadMessageHistory} = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;
        if (!interaction.isButton()) return;
        const data = await TicketSetup.findOne({GuildID: guild.id});
        if (!data) return;
        if (!data.Button.includes(customId)) return;
        const alreadyticketEmbed = new EmbedBuilder().setDescription('Désolé mais vous avez deja ouvert un ticket.').setColor('Red')
        const findTicket = await TicketSchema.findOne({GuildID: guild.id, OwnerID: member.id});
        if (findTicket) return interaction.reply({embeds: [alreadyticketEmbed], ephemeral: true}).catch(error => {return});
        if (!guild.members.me.permissions.has(ManageChannels)) return interaction.reply({content: 'Sorry, i don\'t have permissions.', ephemeral: true}).catch(error => {return});
        try {
            await guild.channels.create({
                name: 'ticket-' + ticketId,
                type: ChannelType.GuildText,
                parent: data.Category,
                permissionOverwrites: [
                    {
                        id: data.Everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: data.Handlers,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory, ManageChannels],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).catch(error => {return}).then(async (channel) => {
                await TicketSchema.create({
                    GuildID: guild.id,
                    OwnerID: member.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Locked: false,
                    Claimed: false,
                });
                await channel.setTopic('🌿 Ticket ouvert par' + ' <@' + member.id + '>').catch(error => {return});
                const embed = new EmbedBuilder().setTitle('Bienvenue à vous, merci d\'avoir ouver un ticket').setDescription('Un membre de notre modération va bientot traiter votre requête. \n Merci à vous d\'avoir attendu dans le calme et la bonne humeur.')
                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('ticket-close').setLabel('Fermer').setStyle(ButtonStyle.Danger).setEmoji('📪'),
                    new ButtonBuilder().setCustomId('ticket-lock').setLabel('Lock').setStyle(ButtonStyle.Secondary).setEmoji('🔒'),
                    new ButtonBuilder().setCustomId('ticket-unlock').setLabel('Unlock').setStyle(ButtonStyle.Secondary).setEmoji('🔓'),
                    new ButtonBuilder().setCustomId('ticket-manage').setLabel('Membres').setStyle(ButtonStyle.Secondary).setEmoji('➕'),
                    new ButtonBuilder().setCustomId('ticket-claim').setLabel('Claim').setStyle(ButtonStyle.Primary).setEmoji('👋'),
                );
                channel.send({embeds: ([embed]),components: [button]}).catch(error => {return});
                const handlersmention = await channel.send({content : '<@&' + data.Handlers + '>'});
                handlersmention.delete().catch(error => {return});
                const ticketmessage = new EmbedBuilder().setDescription('✅ Votre ticket a été crée' + ' <#' + channel.id + '>').setColor('Green');
                interaction.reply({embeds: [ticketmessage], ephemeral: true}).catch(error => {return});
            })
        } catch (err) {
            return console.log(err);
        }

    }
}