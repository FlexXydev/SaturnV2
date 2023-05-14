const Discord = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
const { connect, mongoose } = require('mongoose');
const { ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const now = new Date();
const time = now.toLocaleTimeString("fr-FR")
require('@colors/colors');
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.modals = new Discord.Collection();



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
  	fetch('https://ntfy.sh/SaturnDev', {
  method: 'POST', // PUT works too
  body: 'Saturn is about to start.'
})
    console.clear();
    console.log(`[${client.user.username}] `.green + client.user.username + ' is been logged.');
    mongoose.set('strictQuery', true);
    connect(config.database, {
    }).then(() => {
    console.log('[MongoDB API] '.green + 'is now connected.')
    console.log(`[${client.user.username}] `.green + `${client.user.username} is on ${client.guilds.cache.size}`)
    console.log(`[${client.user.username}] `.green + `${client.user.username} was started at ${time}`)
    console.log(`[${client.user.username}] `.green + 'Activity are loading ! Launch of temporary status')
    require('./error')
    client.user.setPresence({
      activities: [{ name: config.status }],
      status: 'dnd',
      type: ActivityType.Watching
    });

    setInterval(() => {

      const online = new EmbedBuilder()
      .setColor('Random')
      .setTitle('👍・Tout va bien jusqu\'ici !')
      .setDescription(`Don\'t worry, every things are safe. \n It\'s been 24h that ${client.user.username} is online`)
      .setFooter({ text: 'This message is send every 24h', iconURL: config.avatarURL })

      channel.send({ embeds: [online] })
      console.log(`[${client.user.username}] `.green + "The embed that is sended every 24h as been sended")
      channel.send(`<@&${config.roleid}>`)


    }, 86400000);

    let currentActivity = 0;
    let maxActivity = 1;

    setInterval(async () => {
      currentActivity++;
      if (currentActivity > maxActivity) { currentActivity = 0; }
      switch(currentActivity) {
        case 0:
          console.log(`[${client.user.username}] `.green + 'Activity changed to French')
          client.user.setPresence({
            activities: [{ name: config.activity1 }],
            status: 'dnd',
            type: ActivityType.Playing
          })
          case 1:
            console.log(`[${client.user.username}] `.green + 'Activity changed to English')
            client.user.setPresence({
              activities: [{ name: config.activity2 }],
              status: 'dnd',
              type: ActivityType.Playing
            });
            break;
      }
    }, 30000);

    loadEvents(client);
    loadCommands(client);
    });
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
