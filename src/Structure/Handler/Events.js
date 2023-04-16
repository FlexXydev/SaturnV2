const fs = require('fs');

module.exports = async (bot) => {
    const eventFiles = fs.readdirSync('./src/Events/').filter(f => f.endsWith('.js'))
    for (const file of eventFiles) {
        const event = require(`../../Events/${file}`)
        if(event.once) {
          console.log(`🎉 | L'event ${file} à été chargé avec succès !`)
          bot.once(event.name, (...args) => event.execute(...args, bot))
        } else {
          console.log(`🎉 | L'event ${file} à été chargé avec succès !`)
          bot.on(event.name, (...args) => event.execute(...args, bot))
        }
    }

    const eventSubFolders = fs.readdirSync('./src/Events/').filter(f => !f.endsWith('.js'))
    eventSubFolders.forEach(folder => {
      const commandFiles = fs.readdirSync(`./src/Events/${folder}/`).filter(f => f.endsWith('.js'))

      for (const file of commandFiles) {
        const event = require(`../../Events/${folder}/${file}`)
        if(event.once) {
          console.log(`🎉 | L'event ${file} à été chargé avec succès depuis ${folder} !`)
          bot.once(event.name, (...args) => event.execute(...args, bot))
        } else {
          console.log(`🎉 | L'event ${file} à été chargé avec succès depuis ${folder} !`)
          bot.on(event.name, (...args) => event.execute(...args, bot))
        }
      }
    });
}