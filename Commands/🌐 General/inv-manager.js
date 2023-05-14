const { SlashCommandBuilder } = require('@discordjs/builders');

const { EmbedBuilder } = require('discord.js');



module.exports = {

  data: new SlashCommandBuilder()

    .setName('invites')

    .setDescription('Displays the number of invites for the specified user or the user who triggered the command')

    .addUserOption(option => 

      option.setName('user')

      .setDescription('The user to check invites for')

      .setRequired(false)

    ),

  async execute(interaction) {

    await interaction.deferReply()

    const inviter = interaction.options.getUser('user') ?? interaction.user;



    // Get the guild's invites

    const invites = await interaction.guild.invites.fetch();



    // Find the invites created by the inviter

    const userInvites = invites.filter(invite => invite.inviter.id === inviter.id);



    // Calculate the number of remaining, fake, and bonus invites

    let remainingInvites = 0;

    let fakeInvites = 0;

    let bonusInvites = 0;



    userInvites.forEach(invite => {

      const uses = invite.uses;

      const maxUses = invite.maxUses;



      if (uses === 0) {

        remainingInvites++;

      } else if (uses > maxUses) {

        fakeInvites++;

      } else if (uses <= maxUses) {

        bonusInvites += (maxUses - uses);

      }

    });



    // Create and send the embed with the invite statistics

    const embed = new EmbedBuilder()

      .setColor('#0099ff')

      .setTitle(`${inviter.username}'s Invites`)

      .setThumbnail(inviter.avatarURL())

      .addFields(

        { name: 'Total Invites', value: `${userInvites.size}`},

        { name: 'Remaining Invites', value: `${remainingInvites}`},

        { name: 'Fake Invites', value: `${fakeInvites}`},

        { name: 'Bonus Invites', value: `${bonusInvites}`},

      );



    return interaction.editReply({ embeds: [embed]});

  },

};

