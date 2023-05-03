const testSchema = require('../../Schemas/test')

class command {
    constructor() {
        this.name = "db-test",
        this.description = "! Developeurs uniquement !"
    }

    async execute(bot, interaction) {
        
        try {
            const data = await testSchema.findOne({
              GuildID: interaction.guild.id,
              UserID: interaction.user.id,
            });
      
            if (!data) {
              testSchema.create({
                GuildID: interaction.guild.id,
                UserID: interaction.user.id,
              });
            }
      
            if (data) {
              console.log(data);
            }
          } catch (error) {
            console.log(error);
          }
}
}

module.exports = command