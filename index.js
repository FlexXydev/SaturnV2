const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js');
const bot = new Client({ intents: new IntentsBitField(3276799) });

bot.commands = new Collection();
bot.config = require('./config');

require('./src/Structure/Handler/Events')(bot);
require('./src/Structure/Handler/Command')(bot);

bot.login(bot.config.token)