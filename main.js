const Discord = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
const { connect, mongoose } = require('mongoose');
const { ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType } = require('discord.js');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const now = new Date();
const time = now.toLocaleTimeString("fr-FR")
const { CaptchaGenerator } = require('captcha-canvas');
require('@colors/colors');
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.modals = new Discord.Collection();

// Error Handler

client.on("error", (err) => {
  const ChannelID = "1060193672433520760";
  console.log("Discord API Error:", err);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Discord API Error/Catch:\n\n** ```" + err + "```"
      ),
    ],
  });
});

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1060193672433520760";
  console.log("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});

process.on("uncaughtException", (err, origin) => {
  const ChannelID = "1060193672433520760";
  console.log("Uncaught Exception:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Uncought Exception/Catch:\n\n** ```" + err + "```"
      ),
    ],
  });
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  const ChannelID = "1060193672433520760";
  console.log("Uncaught Exception Monitor:", err, origin);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Uncaught Exception Monitor/Catch:\n\n** ```" + err + "```"
      ),
    ],
  });
});

process.on("warning", (warn) => {
  const ChannelID = "1060193672433520760";
  console.log("Warning:", warn);
  const Embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTimestamp()
    .setFooter({ text: "⚠️ Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Warning/Catch:\n\n** ```" + warn + "```"
      ),
    ],
  });
});

// When the bot join a guild

client.on('guildCreate', async guild => {
  try {
    const owner = await guild.fetchOwner();
    const avatarURL = client.user.displayAvatarURL({ format: 'png', size: 512 });
    const embed = new EmbedBuilder()
      .setColor("2b2d31")
      .setTitle(`Thank you for adding ${client.user.username} in your server`)
      .setFooter({ text: 'Thank you so much !'})
      .setDescription(`Thank you for adding ${client.user.username} to your server ! If you have any question or some bug report feel free to join our support server !`)
      .setThumbnail(avatarURL);
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('Support Server')
          // In the url put your support server
          .setURL('https://discord.gg/ndJyxZs3sF')
      );
    owner.send({ embeds: [embed], components: [row] });
  } catch (error) {
    console.error(`Unable to send message to server owner for guild ${guild.name}.`, error);
  }
});

// When ready
client
  .login(config.token)
  .then(() => {
    console.clear();
    console.log(`[${client.user.username}] `.green + client.user.username + ' is been logged.');
    mongoose.set('strictQuery', true);
    connect(config.database, {
    }).then(() => {	
    console.log('[MongoDB API] '.green + 'is now connected.')
    console.log(`[${client.user.username}] `.green + `${client.user.username} is on ${client.guilds.cache.size}`)
    console.log(`[${client.user.username}] `.green + `${client.user.username} was started at ${time}`)
    console.log(`[${client.user.username}] `.green + 'Activity are loading ! Launch of temporary status')
    client.user.setPresence({
      activities: [{ name: config.status }],
      status: 'dnd',
      type: ActivityType.Watching
    });

    setInterval(() => {

      let activities = [
          { type: 'Playing', name: 'in the darkness.'},
          { type: 'Playing', name: '/help manual.'},
          { type: 'Playing', name: 'with my features.'},
          { type: 'Listening', name: 'to all your vocal channels'},
          { type: 'Watching', name: 'FlexXyDEVVVVVVV'},
          { type: 'Watching', name: 'your text channels'},
          { type: 'Watching', name: `${client.guilds.cache.size} servers !`},
          { type: 'Watching', name: `${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)} members !`},
          { type: 'Playing', name: `with my ${client.commands.size} commands.`}
      ];

      const status = activities[Math.floor(Math.random() * activities.length)];

      if (status.type === 'Watching') {
          console.log(`[${client.user.username}] `.green + `Activity changed to ${status.name} with type ${status.type}`);
          client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Watching }]});
      } if (status.type === 'Playing') {
          console.log(`[${client.user.username}] `.green + `Activity changed to ${status.name} with type ${status.type}`);
          client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Playing }]});
      } if (status.type === 'Listening') {
        console.log(`[${client.user.username}] `.green + `Activity changed to ${status.name} with type ${status.type}`);
        client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Listening }]});
    }
      
  }, 9000);

    loadEvents(client);
    loadCommands(client);
    const ChannelID = "1060193672433520760";
    const icon = config.avatarURL
    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const embed = new EmbedBuilder()

    .setColor("Purple")

    .setThumbnail(`${icon}`)

    .setDescription(`**${client.user.username}** is on !` )

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

    .setFooter({ text: `${client.user.username} 2023` })
        const Channel = client.channels.cache.get(ChannelID);
        Channel.send({ embeds: [embed] })
        Channel.send(`<@&${config.roleid}>`)
    });

    setInterval(() => {
      const ChannelID = "1060193672433520760";
      const channel = client.channels.cache.get(ChannelID);
      const online = new EmbedBuilder()
      .setColor('Random')
      .setTitle(`Don't worry ${client.user.username} is on !`)
      .setDescription(`Don\'t worry, every things are safe. \n It\'s been 24h that ${client.user.username} is online`)
      .setFooter({ text: 'This message is send every 24h', iconURL: config.avatarURL })

      channel.send({ embeds: [online] })
      console.log(`[${client.user.username}] `.green + "The embed that is sended every 24h as been sended")
      channel.send(`<@&${config.roleid}>`)


    }, 86400000);
    })
  .catch((err) => console.log(err));

// Leave Message //

client.on(Events.GuildMemberRemove, async (member, err) => {

    const leavedata = await welcomeschema.findOne({ Guild: member.guild.id });

    if (!leavedata) return;

    else {

        const channelID = leavedata.Channel;

        const channelwelcome = member.guild.channels.cache.get(channelID);

        const embedleave = new EmbedBuilder()

        .setColor("DarkBlue")

        .setTitle(`${member.user.username} has left`)

        .setDescription( `> ${member} has left the Server`)

        .setFooter({ text: `👋 Cast your goobyes`})

        .setTimestamp()

        .setAuthor({ name: `👋 Member Left`})

        .setThumbnail(config.avatarURL)

        const welmsg = await channelwelcome.send({ embeds: [embedleave]}).catch(err);

        welmsg.react('👋');

    }

})

// Welcome Message //
const welcomeschema = require('./Schemas/welcome')
const roleschema = require('./Schemas/autorole')

client.on(Events.GuildMemberAdd, async (member, err) => {

    const welcomedata = await welcomeschema.findOne({ Guild: member.guild.id });

    if (!welcomedata) return;

    else {

        const channelID = welcomedata.Channel;

        const channelwelcome = member.guild.channels.cache.get(channelID)

        const roledata = await roleschema.findOne({ Guild: member.guild.id });

        if (roledata) {

            const giverole = await member.guild.roles.cache.get(roledata.Role)

            member.roles.add(giverole).catch(err => {

                console.log('Error received trying to give an auto role!');

            })

        }

        

        const embedwelcome = new EmbedBuilder()

         .setColor("DarkBlue")

         .setTitle(`${member.user.username} has arrived\nto the Server!`)

         .setDescription( `> Welcome ${member} to the Sevrer!`)

         .setFooter({ text: `👋 Get cozy and enjoy :)`})

         .setTimestamp()

         .setAuthor({ name: `👋 Welcome to the Server!`})

         .setThumbnail(config.avatarURL)

    

        const embedwelcomedm = new EmbedBuilder()

         .setColor("DarkBlue")

         .setTitle('Welcome Message')

         .setDescription( `> Welcome to ${member.guild.name}!`)

         .setFooter({ text: `👋 Get cozy and enjoy :)`})

         .setTimestamp()

         .setAuthor({ name: `👋 Welcome to the Server!`})

         .setThumbnail(config.avatarURL)

    

        const levmsg = await channelwelcome.send({ embeds: [embedwelcome]});

        levmsg.react('👋');

        member.send({ embeds: [embedwelcomedm]}).catch(err => console.log(`Welcome DM error: ${err}`))

    

    } 

})

// Member Voice Channels Code //

const voiceschema = require('./Schemas/voicechannels')
 
client.on(Events.GuildMemberAdd, async (member, err) => {
 
    if (member.guild === null) return;
    const voicedata = await voiceschema.findOne({ Guild: member.guild.id });
 
    if (!voicedata) return;
    else {
 
        const totalvoicechannel = member.guild.channels.cache.get(voicedata.TotalChannel);
        if (!totalvoicechannel || totalvoicechannel === null) return;
        const totalmembers = member.guild.memberCount;
        const TotalChannelName = voicedata.ChannelName
 
        totalvoicechannel.setName(`${TotalChannelName} ${totalmembers}`).catch(err);
 
    }
})
 
client.on(Events.GuildMemberRemove, async (member, err) => {
 
    if (member.guild === null) return;
    const voicedata1 = await voiceschema.findOne({ Guild: member.guild.id });
 
    if (!voicedata1) return;
    else {
 
        const totalvoicechannel1 = member.guild.channels.cache.get(voicedata1.TotalChannel);
        if (!totalvoicechannel1 || totalvoicechannel1 === null) return;
        const totalmembers1 = member.guild.memberCount;
        const TotalChannelName1 = voicedata1.ChannelName
 
        totalvoicechannel1.setName(`${TotalChannelName1} ${totalmembers1}`).catch(err);
 
    }
})

// Total Bots Voice Channel Code //
 
const botschema = require('./Schemas/botsvoicechannels')

client.on(Events.GuildMemberAdd, async (member, err) => {
 
    if (member.guild === null) return;
    const botdata = await botschema.findOne({ Guild: member.guild.id });
 
    if (!botdata) return;
    else {
 
        const botvoicechannel = member.guild.channels.cache.get(botdata.BotChannel);
        if (!botvoicechannel || botvoicechannel === null) return;
        const botslist = member.guild.members.cache.filter(member => member.user.bot).size;
 		const BotChannelName1 = botdata.ChannelName
        
        botvoicechannel.setName(`${BotChannelName1} ${botslist}`).catch(err);
 
    }
})
 
client.on(Events.GuildMemberRemove, async (member, err) => {
 
    if (member.guild === null) return;
    const botdata1 = await botschema.findOne({ Guild: member.guild.id });
 
    if (!botdata1) return;
    else {
 
        const botvoicechannel1 = member.guild.channels.cache.get(botdata1.BotChannel);
        const BotChannelName = botdata1.ChannelName
        if (!botvoicechannel1 || botvoicechannel1 === null) return;
        const botslist1 = member.guild.members.cache.filter(member => member.user.bot).size;
 
        botvoicechannel1.setName(`${BotChannelName} ${botslist1}`).catch(err);
 
    }
})

// POLL SYSTEM //

const pollschema = require('./Schemas/votes');

const pollsetup = require('./Schemas/votesetup');

client.on(Events.MessageCreate, async message => {

    if (!message.guild) return;

    const setupdata = await pollsetup.findOne({ Guild: message.guild.id });

    if (!setupdata) return;

    if (message.channel.id !== setupdata.Channel) return;

    if (message.author.bot) return;

    const embed = new EmbedBuilder()

    .setColor("#ecb6d3")

    .setThumbnail(config.avatarURl)

    .setAuthor({ name: `🤚 Poll System`})

    .setFooter({ text: `🤚 Poll Started`})

    .setTimestamp()

    .setTitle('• Poll Began')

    .setDescription(`> ${message.content}`)

    .addFields({ name: `• Upvotes`, value: `> **No votes**`, inline: true})

    .addFields({ name: `• Downvotes`, value: `> **No votes**`, inline: true})

    .addFields({ name: `• Author`, value: `> ${message.author}`})

    try {

        await message.delete();

    } catch (err) {

    }

    const buttons = new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()

        .setCustomId('up')

        .setLabel(' ')

        .setEmoji('<:tick:1102942811101335593>')

        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()

        .setCustomId('down')

        .setLabel(' ')

        .setEmoji('<:crossmark:1102943024415260673>')

        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()

        .setCustomId('votes')

        .setLabel('• Votes')

        .setStyle(ButtonStyle.Secondary)

    )

    const msg = await message.channel.send({ embeds: [embed], components: [buttons] });

    msg.createMessageComponentCollector();

    await pollschema.create({

        Msg: msg.id,

        Upvote: 0,

        Downvote: 0,

        UpMembers: [],

        DownMembers: [],

        Guild: message.guild.id,

        Owner: message.author.id

    })

})

client.on(Events.InteractionCreate, async i => {

    if (!i.guild) return;

    if (!i.message) return;

    const data = await pollschema.findOne({ Guild: i.guild.id, Msg: i.message.id });

    const msg = await i.channel.messages.fetch(data.Msg)

        if (i.customId === 'up') {

            if (i.user.id === data.Owner) return await i.reply({ content: `❌ You **cannot** upvote your own **poll**!`, ephemeral: true });

            if (data.UpMembers.includes(i.user.id)) return await i.reply({ content: `❌ You have **already** upvoted this **poll**`, ephemeral: true});

            let downvotes = data.Downvote;

            if (data.DownMembers.includes(i.user.id)) {

                downvotes = downvotes - 1;

            }

            const newembed = EmbedBuilder.from(msg.embeds[0]).setFields({ name: `• Upvotes`, value: `> **${data.Upvote + 1}** Votes`, inline: true}, { name: `• Downvotes`, value: `> **${downvotes}** Votes`, inline: true}, { name: `• Author`, value: `> <@${data.Owner}>`});

            const buttons = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                .setCustomId('up')

                .setEmoji('<:tick:1102942811101335593>')

                .setLabel(`${data.Upvote + 1}`)

                .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()

                .setCustomId('down')

                .setEmoji('<:crossmark:1102943024415260673>')

                .setLabel(`${downvotes}`)

                .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()

                .setCustomId('votes')

                .setLabel('• Votes')

                .setStyle(ButtonStyle.Secondary)

            )

            await i.update({ embeds: [newembed], components: [buttons] })

            data.Upvote++

            if (data.DownMembers.includes(i.user.id)) {

                data.Downvote = data.Downvote - 1;

            }

            data.UpMembers.push(i.user.id)

            data.DownMembers.pull(i.user.id)

            data.save();

            

        }

        if (i.customId === 'down') {

            if (i.user.id === data.Owner) return await i.reply({ content: `❌ You **cannot** downvote your own **poll**!`, ephemeral: true });

            if (data.DownMembers.includes(i.user.id)) return await i.reply({ content: `❌ You have **already** downvoted this **poll**`, ephemeral: true});

            let upvotes = data.Upvote;

            if (data.UpMembers.includes(i.user.id)) {

                upvotes = upvotes - 1;

            }

            const newembed = EmbedBuilder.from(msg.embeds[0]).setFields({ name: `• Upvotes`, value: `> **${upvotes}** Votes`, inline: true}, { name: `• Downvotes`, value: `> **${data.Downvote + 1}** Votes`, inline: true}, { name: `• Author`, value: `> <@${data.Owner}>`});

            const buttons = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                .setCustomId('up')

                .setEmoji('<:tick:1102942811101335593>')

                .setLabel(`${upvotes}`)

                .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()

                .setCustomId('down')

                .setEmoji('<:crossmark:1102943024415260673>')

                .setLabel(`${data.Downvote + 1}`)

                .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()

                .setCustomId('votes')

                .setLabel('• Votes')

                .setStyle(ButtonStyle.Secondary)

            )

            await i.update({ embeds: [newembed], components: [buttons] })

            data.Downvote++

            if (data.UpMembers.includes(i.user.id)) {

                data.Upvote = data.Upvote - 1;

            }

            data.DownMembers.push(i.user.id);

            data.UpMembers.pull(i.user.id);

            data.save();

            

        }

        if (i.customId === 'votes') {

            let upvoters = [];

            await data.UpMembers.forEach(async member => {

                upvoters.push(`<@${member}>`)

            })

            let downvoters = [];

            await data.DownMembers.forEach(async member => {

                downvoters.push(`<@${member}>`)

            })

            const embed = new EmbedBuilder()

            .setTitle('> Poll Votes')

            .setColor("#ecb6d3")

            .setThumbnail(config.avatarURL)

            .setAuthor({ name: `🤚 Poll System`})

            .setFooter({ text: `🤚 Poll Members`})

            .setTimestamp()

            .addFields({ name: `• Upvoters (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || 'No upvoters'}`, inline: true})

            .addFields({ name: `• Downvoters (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || 'No downvoters'}`, inline: true})

            await i.reply({ embeds: [embed], ephemeral: true })

        }

})

const capschema = require('./Schemas/verify');
const verifyusers = require('./Schemas/verifyusers');

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.guild === null) return;

    const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
    const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

    if (interaction.customId === 'verify') {

        if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true});

        if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true})
        else {

            let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
            let result = Math.floor(Math.random() * letter.length);
            let result2 = Math.floor(Math.random() * letter.length);
            let result3 = Math.floor(Math.random() * letter.length);
            let result4 = Math.floor(Math.random() * letter.length);
            let result5 = Math.floor(Math.random() * letter.length);

            const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
            console.log(cap)

            const captcha = new CaptchaGenerator()
            .setDimension(150, 450)
            .setCaptcha({ text: `${cap}`, size: 60, color: "red"})
            .setDecoy({ opacity: 0.5 })
            .setTrace({ color: "red" })

            const buffer = captcha.generateSync();
            
            const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
            
            const verifyembed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: `✅ Verification Proccess`})
            .setFooter({ text: `✅ Verification Captcha`})
            .setTimestamp()
            .setImage('attachment://captcha.png')
            .setThumbnail(config.avatarURL)
            .setTitle('> Verification Step: Captcha')
            .addFields({ name: `• Verify`, value: '> Please use the button bellow to \n> submit your captcha!'})

            const verifybutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('✅ Enter Captcha')
                .setStyle(ButtonStyle.Success)
                .setCustomId('captchaenter')
            )

            const vermodal = new ModalBuilder()
            .setTitle('Verification')
            .setCustomId('vermodal')

            const answer = new TextInputBuilder()
            .setCustomId('answer')
            .setRequired(true)
            .setLabel('• Please sumbit your Captcha code')
            .setPlaceholder('Your captcha code')
            .setStyle(TextInputStyle.Short)

            const vermodalrow = new ActionRowBuilder().addComponents(answer);
            vermodal.addComponents(vermodalrow);

            const vermsg = await interaction.reply({ embeds: [verifyembed], components: [verifybutton], ephemeral: true, files: [verifyattachment] });

            const vercollector = vermsg.createMessageComponentCollector();

            vercollector.on('collect', async i => {

                if (i.customId === 'captchaenter') {
                    i.showModal(vermodal);
                }

            })

            if (verifyusersdata) {

                await verifyusers.deleteMany({
                    Guild: interaction.guild.id,
                    User: interaction.user.id
                })

                await verifyusers.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: cap
                })

            } else {

                await verifyusers.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: cap
                })

            }
        } 
    }
})

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'vermodal') {

        const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
        const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });

        if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `You have **already** verified within this server!`, ephemeral: true});
        
        const modalanswer = interaction.fields.getTextInputValue('answer');
        if (modalanswer === userverdata.Key) {

            const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);

            try {
                await interaction.member.roles.add(verrole);
            } catch (err) {
                return await interaction.reply({ content: `There was an **issue** giving you the **<@&${verificationdata.Role}>** role, try again later!`, ephemeral: true})
            }

            await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
            await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});

        } else {
            await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
        }
    }
})

client.on('guildMemberRemove', member => {
   
  removeUserData(member);
});


async function removeUserData(member) {

const memberId = member.id;


await capschema.updateOne({ Guild: member.guild.id }, { $pull: { Verified: memberId }});
}

// Music System

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [ new SpotifyPlugin() ]
})

module.exports = client;

// When someone say Hi on a server it react

client.on('messageCreate', message => {
  if (message.content.match(/hey\b|hello\b|bonjour\b|heya\b|hi\b/i)) {
    message.react('👋');
  }
});

// For someone request

client.on('messageCreate', message => {
  if (message.content.match('c\'est quoi la voiture de ronantml')) {
    message.reply('c\'est les Renault bien sur');
  }
});

// Easter EGGSSS

client.on('messageCreate', message => {
  if (message.content.match('Satourne qui tourne autour de Saturne')) {
    message.reply(':middle_finger:');
  }
});

client.on('messageCreate', message => {
  if (message.content.match('Never gonna give you up')) {
    message.reply('Never gonna let you down');
  }
});

// Join To Create //

const joinschema = require('./Schemas/jointocreate');
const joinchannelschema = require('./Schemas/jointocreatechannels')

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {

  try {
      if (newState.member.guild === null) return;
  } catch (err) {
      return;
  }

  if (newState.member.id === '1076798263098880116') return;

  const joindata = await joinschema.findOne({ Guild: newState.member.guild.id });
  const joinchanneldata1 = await joinchannelschema.findOne({ Guild: newState.member.guild.id, User: newState.member.id });

  const voicechannel = newState.channel;

  if (!joindata) return;

  if (!voicechannel) return;
  else {

      if (voicechannel.id === joindata.Channel) {

          if (joinchanneldata1) {
              
              try {

                  const joinfail = new EmbedBuilder()
                  .setColor('DarkRed')
                  .setThumbnail(config.avatarURL)
                  .setTimestamp()
                  .setAuthor({ name: `🔊 Join to Create System`})
                  .setFooter({ text: `🔊 Issue Faced`})
                  .setTitle('> You tried creating a \n> voice channel but..')
                  .addFields({ name: `• Error Occured`, value: `> You already have a voice channel \n> open at the moment.`})

                  return await newState.member.send({ embeds: [joinfail] });

              } catch (err) {
                  return;
              }

          } else {

              try {

                  const channel = await newState.member.guild.channels.create({
                      type: ChannelType.GuildVoice,
                      name: `${newState.member.user.username}'s Voice Channel`,
                      userLimit: joindata.VoiceLimit,
                      parent: joindata.Category
                  })
                  
                  try {
                      await newState.member.voice.setChannel(channel.id);
                  } catch (err) {
                      console.log('Error moving member to the new channel!')
                  }   

                  setTimeout(() => {

                      joinchannelschema.create({
                          Guild: newState.member.guild.id,
                          Channel: channel.id,
                          User: newState.member.id
                      })

                  }, 500)
                  
              } catch (err) {

                  console.log(err)

                  try {

                      const joinfail = new EmbedBuilder()
                      .setColor('DarkRed')
                      .setThumbnail(config.avatarURL)
                      .setTimestamp()
                      .setAuthor({ name: `🔊 Join to Create System`})
                      .setFooter({ text: `🔊 Issue Faced`})
                      .setTitle('> You tried creating a \n> voice channel but..')
                      .addFields({ name: `• Error Occured`, value: `> I could not create your channel, \n> perhaps I am missing some permissions.`})
  
                      await newState.member.send({ embeds: [joinfail] });
  
                  } catch (err) {
                      return;
                  }

                  return;

              }

              try {

                  const joinsuccess = new EmbedBuilder()
                  .setColor('DarkRed')
                  .setThumbnail(config.avatarURL)
                  .setTimestamp()
                  .setAuthor({ name: `🔊 Join to Create System`})
                  .setFooter({ text: `🔊 Channel Created`})
                  .setTitle('> Channel Created')
                  .addFields({ name: `• Channel Created`, value: `> Your voice channel has been \n> created in **${newState.member.guild.name}**!`})

                  await newState.member.send({ embeds: [joinsuccess] });

              } catch (err) {
                  return;
              }
          }
      }
  }
})

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {

  try {
      if (oldState.member.guild === null) return;
  } catch (err) {
      return;
  }

  if (oldState.member.id === '1076798263098880116') return;

  const leavechanneldata = await joinchannelschema.findOne({ Guild: oldState.member.guild.id, User: oldState.member.id });

  if (!leavechanneldata) return;
  else {

      const voicechannel = await oldState.member.guild.channels.cache.get(leavechanneldata.Channel);

      if (newState.channel === voicechannel) return;

      try {
          await voicechannel.delete()
      } catch (err) {
          return;
      }

      await joinchannelschema.deleteMany({ Guild: oldState.guild.id, User: oldState.member.id })
      try {

          const deletechannel = new EmbedBuilder()
          .setColor('DarkRed')
          .setThumbnail(config.avatarURL)
          .setTimestamp()
          .setAuthor({ name: `🔊 Join to Create System`})
          .setFooter({ text: `🔊 Channel Deleted`})
          .setTitle('> Channel Deleted')
          .addFields({ name: `• Channel Deleted`, value: `> Your voice channel has been \n> deleted in **${newState.member.guild.name}**!`})

          await newState.member.send({ embeds: [deletechannel] });

      } catch (err) {
          return;
      } 
  }
})

// Leveling System Code //

const levelSchema = require('./Schemas/level');
const levelschema = require('./Schemas/levelsetup');

client.on(Events.MessageCreate, async (message, err) => {

    const { guild, author } = message;
    if (message.guild === null) return;
    const leveldata = await levelschema.findOne({ Guild: message.guild.id });

    if (!leveldata || leveldata.Disabled === 'disabled') return;
    let multiplier = 1;
    
    multiplier = Math.floor(leveldata.Multi);
    

    if (!guild || author.bot) return;

    levelSchema.findOne({ Guild: guild.id, User: author.id}, async (err, data) => {

        if (err) throw err;

        if (!data) {
            levelSchema.create({
                Guild: guild.id,
                User: author.id,
                XP: 0,
                Level: 0
            })
        }
    })

    const channel = message.channel;

    const give = 1;

    const data = await levelSchema.findOne({ Guild: guild.id, User: author.id});

    if (!data) return;

    const requiredXP = data.Level * data.Level * 20 + 20;

    if (data.XP + give >= requiredXP) {

        data.XP += give;
        data.Level += 1;
        await data.save();
        
        if (!channel) return;

        const levelembed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`> ${author.username} has Leveled Up!`)
        .setFooter({ text: `⬆ ${author.username} Leveled Up`})
        .setTimestamp()
        .setThumbnail(config.avatarURL)
        .addFields({ name: `• New Level Unlocked`, value: `> ${author.username} is now level **${data.Level}**!`})
        .setAuthor({ name: `⬆ Level Playground`})

        await message.channel.send({ embeds: [levelembed] }).catch(err => console.log('Error sending level up message!'));
    } else {

        if(message.member.roles.cache.find(r => r.id === leveldata.Role)) {
            data.XP += give * multiplier;
        } data.XP += give;
        data.save();
    }
})
