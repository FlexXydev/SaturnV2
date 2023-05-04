const Discord = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
const { connect, mongoose } = require('mongoose');
const { ActivityType, EmbedBuilder } = require('discord.js');
const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const now = new Date();
const time = now.toLocaleTimeString("fr-FR")
require('@colors/colors');
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.selectMenus = new Discord.Collection();
client.modals = new Discord.Collection();

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
