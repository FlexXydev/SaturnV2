const { ActivityType, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const CHANNEL_ID = '1060193672433520760';
const ROLE_ID = '1091319472217919568';
const config = require('../../config')
const mongodbURL = config.db.dbUri


module.exports = {
name: 'ready',
async execute(client) {

    // MangoDB

    if(!mongodbURL) return;

    await mongoose.connect(mongodbURL || ' ', {
        keepAlive: true,
        useNewURLParser: true,
        useUnifiedTopology: true
    })

    if (mongoose.connect) {
        console.log("🌐 | La DB est lancée ! ")
    } else {
        console.error(`❌ | Une erreur s'est produite lors de la connection à la db : ${error}`)
    }

const now = new Date();
const time = now.toLocaleTimeString("fr-FR")
    
    console.log(`🕒 | Bot lancé à ` + time);
    console.log(`🤖 | ${client.user.username} est correctement lancé !`);
    console.log(`🌐 | ${client.user.username} est présent sur ${client.guilds.cache.size} serveurs !`);

    // Activité temporaire
    console.log('⏱ | Les activités sont en train de charger. Lancement du status temporaire');
    client.user.setPresence({
        activities: [{ name: config.clients.activity }],
        status: 'dnd',
    });

    // Activité boucle 30s   
    let currentActivity = 0;
    let maxActivity = 1;
    
   
    
    setInterval(() => {
        const channel = client.channels.cache.get(CHANNEL_ID);
 
    const Online = new EmbedBuilder()

      .setColor('Random')

      .setTitle('👍 | Tout va bien jusqu\'ici !')

      .setDescription('Ne vous inquietez pas le bot est toujours en ligne ! Cela fais 24h que le bot est en ligne ! ')
      .setFooter({ text: 'Ce message s\'envoie toutes les 24h' , iconURL: 'https://cdn.discordapp.com/avatars/945224613057683516/6e84cf951537722a3b9ad50c2e66cef3.png' });

channel.send({ embeds: [Online] })
console.log('✅ | L\'embed qui s\'envoie toutes les 24 heures a été envoyé !')
channel.send(`<@&${ROLE_ID}>`)
        
 

  },86400000);      

    
    setInterval(async () => {
        currentActivity++;
        if (currentActivity > maxActivity) { currentActivity = 0; }
        switch (currentActivity) {
            case 0:
                console.log('👍 | Activité changée en Français');
                client.user.setPresence({
                    activities: [{ name: config.clients.activityfr }],
                    status: 'dnd',
                });
                break;
            case 1:
                console.log('👍 | Activité changée en Anglais');
                client.user.setPresence({
                    activities: [{ name: config.clients.activityen }],
                    status: 'dnd',
                });
                break;
        };
    }, 30000);
    
    const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`${client.user.username} est allumé !`)
        .setDescription(`🕒 | Bot lancé à ` + time)
        .addFields(
            { name: 'Serveurs', value:  `${client.guilds.cache.size}`, inline: true },
            { name: 'Version', value: 'Saturn V2', inline: true },
            { name: 'Développeurs', value: 'FlexXyDev#2357, Def4lt#6659', inline: true })
        .setTimestamp();
    
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
        channel.send({ embeds: [embed] })
            .then(() => console.log('✅ | Embed envoyé avec succès !'))
            .catch((error) => console.error(`❌ | Une erreur s'est produite lors de l'envoi du message : ${error}`));
    } else {
        console.error(`❌ | Impossible de trouver le canal avec l'ID ${CHANNEL_ID}.`);
    }
    
    channel.send(`<@&${ROLE_ID}>`)
}
};