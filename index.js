const { Player } = require('discord-player');
const { Client, IntentsBitField, Collection } = require('discord.js');
const bot = new Client({ intents: new IntentsBitField(3276799) });

bot.commands = new Collection();
bot.config = require('./config');

bot.player = new Player(bot, bot.config.opt.discordPlayer);

require('./src/Structure/Music/Events')(bot);
require('./src/Structure/Handler/Command')(bot);
require('./src/Structure/Handler/Events')(bot);
require('./src/Structure/Giveaway/giveaway')(bot)

bot.on('ready', async () => {

    const ticketSchema = require('./src/Schemas/ticket');
      
    // Récupérer les données de la base de données
    const data = await ticketSchema.find();
    console.log(`Il y a ${data.length} enregistrements de tickets dans la base de données.`);

    const tickets = await ticketSchema.find({});
    tickets.forEach((data) => {
    const channelId = data.Channel;
    const guildName = data.GuildName;
    const categoryId = data.Category;
    const roleId = data.Role;

    // Vérifier si les canaux, catégories et rôles existent
    if (channelId && guildName && categoryId && roleId) {
    console.log(`Ticket Verification to DB : \n Channels : ${channelId} \n Guild Name : ${guildName} \n Category : ${categoryId} \n Role : ${roleId}`)
}
});
  });

bot.login(bot.config.token)