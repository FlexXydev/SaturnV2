const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Fetch another users avatar.')
    .addUserOption((option) => 
    option.setName('user')
    .setDescription('User of the avatar you want to get')
    .setRequired(true)
    ),

    async execute(interaction) {
        const { member } = interaction;
        let user = interaction.options.getUser('user') || interaction.member;
    let jpgAvatar = user.displayAvatarURL({ size: 1024, extension: 'jpg'});
    let pngAvatar = user.displayAvatarURL({ size: 1024, extension: 'png'});
    let webpAvatar = user.displayAvatarURL({ size: 1024, extension: 'webp'});

    const png = new ButtonBuilder()
			.setLabel("PNG")
			.setStyle(ButtonStyle.Link)
			.setURL(`${pngAvatar}`);

    const jpg = new ButtonBuilder()
			.setLabel("JPG")
			.setStyle(ButtonStyle.Link)
			.setURL(`${jpgAvatar}`);    
    const webp = new ButtonBuilder()
			.setLabel("WEBP")
			.setStyle(ButtonStyle.Link)
			.setURL(`${webpAvatar}`);    
		

        const embed = new EmbedBuilder()
        .setColor('#1bfcbe')
         .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
         //delete the // in front of next line if u want it to show in description.
        //.setDescription(`[**PNG**](${pngAvatar}) | [**JPG**](${jpgAvatar}) | [**WEBP**](${webpAvatar})`)
        .setImage(`${jpgAvatar}`)
        .setFooter({ text: `Requested by ${member.user.tag}`, iconURL: `${user.displayAvatarURL()}`});
      //remove line 43  if u dont need buttons 
        const Row = new ActionRowBuilder().addComponents(png, webp, jpg);
        await interaction.reply({
            embeds: [embed],
            components: [Row]
        });
    },
};
