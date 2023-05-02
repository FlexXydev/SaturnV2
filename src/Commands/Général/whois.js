const { EmbedBuilder } = require('discord.js');

class command {

    constructor() {

        this.name = "whois",

        this.description = "Permets d'avoir des informations sur une personne"
        
        this.options = [




            { 

                type: 6, 

                name: "user", 

                description: "Sélectionner un membre", 

                required: false

            },

        ]

    }

    async execute(bot, interaction) {
               const user = interaction.options.getUser('user') || interaction.user;

        const member = await interaction.guild.members.fetch(user.id);

        const icon = user.displayAvatarURL();

        const tag = user.tag;

        const nick = member.displayName;

        const perms = member.permissions;

        

        const embed = new EmbedBuilder()

        .setColor('Random')
        .setAuthor({ name: tag, iconURL: icon })

        .setThumbnail(icon)

        .setDescription(`\`❓\`・${user}'s Information`)

        .addFields({ name: `\`💳\`・ID:`, value: `${user.id}`, inline: false })

        .addFields({ name: `\`📖\`・Nickname:`, value: `${nick}`, inline: false })

        .addFields({ name: `\`🤖\`・Bot:`, value: `${user.bot}`, inline: false })

        .addFields({ name: `\`👋\`・Joined Server:`, value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false })

        .addFields({ name: `\`👴\`・Joined Discord:`, value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false })

       
       
        
   

        .setFooter({ text: tag, iconURL: icon })


        

        


 
        interaction.reply({ embeds: [embed]});

    }

}

module.exports = command