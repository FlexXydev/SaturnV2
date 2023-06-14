const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const { Hangman, wordle } = require(`discord-gamecord`);

const math = require('mathjs');

const wiki = require("wikijs");

module.exports = {

    data: new SlashCommandBuilder()

    .setName("games")

    .setDescription("Game Commands")

    .addSubcommand(command => command

        .setName("8ball")

        .setDescription("8ball game")

        .addStringOption(option => option

            .setName("question")

            .setDescription("Your Question")

            .setRequired(true)

    ))

    .addSubcommand(command => command

        .setName("random")

        .setDescription("random text")

        .addStringOption(option => option

            .setName("option-1")

            .setDescription("the first option")

            .setRequired(true)

        )

        .addStringOption(option => option

            .setName("option-2")

            .setDescription("The second option")

            .setRequired(true)

        ))

    .addSubcommand(command => command

        .setName("coinflip")

        .setDescription("headsntails")

        .addStringOption(option => option

            .setName("answer")

            .setDescription("head or tail")

            .setRequired(true)

            .addChoices(

                {name: "head", value: "head"},

                {name: "tail", value: "tail"}

            )

    ))

    .addSubcommand(command => command

        .setName("hangman")

        .setDescription("Play hangman")

    )

    .addSubcommand(command => command

        .setName("dice")

        .setDescription("random number between 1 and 6")

    )

    .addSubcommand(command => command

        .setName("wordle")

        .setDescription("play wordle")

    )

    .addSubcommand(command => command

        .setName("calculator")

        .setDescription("Calculate something")

    ),

    async execute (interaction, client) {

        const sub = interaction.options.getSubcommand();

        switch (sub) {

            case '8ball':

                const question = interaction.options.getString('question');

                const choice = ["🎱| It is certian.", "🎱| It is decidedly so.", "🎱| Without a doubt.", "🎱| Yes definitely.", "🎱| You may rely on it.", "🎱| As I see it, yes.", "🎱| Most likely.", "🎱| Outlook good.", "🎱| Yes.", "🎱| Signs point to yes.", "🎱| Reply hazy, try again.", "🎱| Ask again later.", "🎱| Better not tell you now.", "🎱| Cannot predict now.", "🎱| Concentrate and ask again.", "🎱| Don't count on it.", "🎱| My reply is no.", "🎱| My sources say no.", "🎱| Outlook not so good.", "🎱| Very doubtful."]

                const ball = Math.floor(Math.random() * choice.length);

 

                const embed = new EmbedBuilder()

                .setColor("Blue")

                 .setTitle(`🎱| ${interaction.user.username}'s 8ball game`)

                 .addFields({ name: "Question", value: `${question}`, inline: true})

 

                const embed2 = new EmbedBuilder()

                .setColor("Blue")

                .setTitle(`🎱| ${interaction.user.username}'s 8ball game`)

                .addFields({ name: "Question", value: `${question}`, inline: true})

                .addFields({ name: "Answer", value: `${choice[ball]}`, inline: true})

 

                const button = new ActionRowBuilder()

                .addComponents(

                  new ButtonBuilder()

                 .setCustomId('button')

                 .setLabel(`🎱 Roll the ball!`)

                 .setStyle(ButtonStyle.Primary)

                )

 

                const msg = await interaction.reply({ embeds: [embed], components: [button] });

 

                const collector = msg.createMessageComponentCollector()

 

                collector.on('collect', async i => {

                 if (i.customId == 'button') {

                 i.update({ embeds: [embed2], components: [] })

                }

                })

            break;

            case 'coinflip':

                await interaction.deferReply()

               const answer = interaction.options.getString("answer")

               const choices = ["head", "tail"]

               const text = Math.floor(Math.random() * choices.length);

               const embed1 = new EmbedBuilder()

               .setColor("Red")

               .setTitle("YOU LOST!")

               .addFields({name: "Your answer:", value:`🪙 ${answer}`, inline: true})

               .addFields({name: "My answer:", value:`🪙 ${choices[text]}`, inline: true})

               const embed3 = new EmbedBuilder()

               .setColor("Green")

               .setTitle("YOU WON!")

               .addFields({name: "Your answer:", value:`🪙 ${answer}`, inline: true})

               .addFields({name: "My answer:", value:`🪙 ${choices[text]}`, inline: true})

               if (answer == choices[text]) {

                 await interaction.followUp({embeds: [embed3]})

                }

               if (answer !== choices[text]) {

                 await interaction.followUp({embeds: [embed1]})

                }

            break;

            case 'hangman':

                const Game = new Hangman({

                    message: interaction,

                    embed: {

                        title: `Hangman`,

                        color: `#5865F2`

                    },

                    hangman: { hat: "🎩", head: `👨‍🦰`, shirt: `👕`, pants: `🩳`, boots: `🥾🥾`},

                    timeoutTime: 60000,

                    timeWords: "all",

                    winMessage: `You won! The word was **{word}**`,

                    loseMessage: `You lost! The word was **{word}**`,

                    playerOnlyMessage: `Only {player} can use these buttons`,

                })

         

                Game.startGame();

                Game.on(`gameOver`, result => {

                    return;

                });

            break;

            case 'dice':

                

              const Nums = [ "1", "2", "3", "4", "5", "6"];

              const ballz = Math.floor(Math.random() * Nums.length);

              const embed500 = new EmbedBuilder()

              .setTitle("dice")

              .addFields(

               {name: "Number:", value: `${ballz}`, inline: true},

               {name: "Requested by:", value: `<@${interaction.user.id}>`}

              )

             .setColor("Green")

              return await interaction.reply({

                 embeds: [embed500]

            });

            break;

            case 'worlde':

                const Gamex = new Wordle({

                    message: interaction,

                    isSlashGame: false,

                    embed: {

                        title: `Wordle`,

                        color: '#5865F2'

                    },

                    customWord: null,

                    timeoutTime: 60000,

                    winMessage: 'You won! The word was **{word}**',

                    loseMessage: 'You lost! The word was **{word}**',

                    playerOnlyMessage: 'Only {player} cam ise these buttons'

                });

         

                Gamex.startGame();

                Gamex.on('gameOver', result => {

                    return;

                })

            break;

            case 'calculator':

                const idPrefix = 'calulator'

 

                const embed700 = new EmbedBuilder()

                    .setDescription("```\nResults will be displayed here\n```")

                    .setColor('Blue')

         

                const row = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setLabel('AC')

                            .setCustomId(idPrefix + "_clear")

                            .setStyle(ButtonStyle.Danger),

                        new ButtonBuilder()

                            .setLabel('(')

                            .setCustomId(idPrefix + "_(")

                            .setStyle(ButtonStyle.Primary),

                        new ButtonBuilder()

                            .setLabel(')')

                            .setCustomId(idPrefix + "_)")

                            .setStyle(ButtonStyle.Primary),

                        new ButtonBuilder()

                            .setLabel('<=')

                            .setCustomId(idPrefix + "_backspace")

                            .setStyle(ButtonStyle.Primary)

                    )

         

                const row1 = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setLabel('1')

                            .setCustomId(idPrefix + "_1")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('2')

                            .setCustomId(idPrefix + "_2")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('3')

                            .setCustomId(idPrefix + "_3")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('/')

                            .setCustomId(idPrefix + "_/")

                            .setStyle(ButtonStyle.Primary)

                    )

         

                const row2 = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setLabel('4')

                            .setCustomId(idPrefix + "_4")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('5')

                            .setCustomId(idPrefix + "_5")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('6')

                            .setCustomId(idPrefix + "_6")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('*')

                            .setCustomId(idPrefix + "_*")

                            .setStyle(ButtonStyle.Primary)

                    )

         

                const row3 = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setLabel('7')

                            .setCustomId(idPrefix + "_7")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('8')

                            .setCustomId(idPrefix + "_8")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('9')

                            .setCustomId(idPrefix + "_9")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('-')

                            .setCustomId(idPrefix + "_-")

                            .setStyle(ButtonStyle.Primary)

                    )

                    

                const row4 = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setLabel('0')

                            .setCustomId(idPrefix + "_0")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('.')

                            .setCustomId(idPrefix + "_.")

                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()

                            .setLabel('=')

                            .setCustomId(idPrefix + "_=")

                            .setStyle(ButtonStyle.Success),

                        new ButtonBuilder()

                            .setLabel('+')

                            .setCustomId(idPrefix + "_+")

                            .setStyle(ButtonStyle.Primary)

                    )

         

                const msg2 = await interaction.reply({ embeds: [embed700], components: [row, row1, row2, row3, row4], ephemeral: false });

         

                let data = "";

                const col = msg2.createMessageComponentCollector({

                    filter: i => i.user.id === interaction.user.id,

                    time: 600000

                });

         

                col.on('collect', async (i) => {

                    const id = i.customId

                    const value = id.split('_')[1];

                    let extra = "";

         

                    if (value === "=") {

                        try {

                            data = math.evaluate(data).toString();

                        } catch (e) {

                            data = "";

                            extra = "An Error Occured, Please click on AC for restart";

                        }

                    } else if (value === "clear") {

                        data = "";

                        extra = "Results will be displayed here"

                    } else if (value === "backspace") {

                        data = data.slice(0, -1);

                    } else {

                        const lc = data[data.length - 1];

         

                        data += `${(

                            (parseInt(value) == value || value === ".")

                            &&

                            (lc == parseInt(lc) || lc === ".")

                        ) || data.length === 0 ? "" : " "}` + value;

                    }

         

                    i.update({ embeds: [new EmbedBuilder().setColor('Blue').setDescription(`\`\`\`\n${data || extra}\n\`\`\``)], components: [row, row1, row2, row3, row4], ephemeral: false })

                })

                break;

                case 'random':

                    const op1 = interaction.options.getString("option-1");

                    const op2 = interaction.options.getString("option-2");

                    const choices7 = [`${op1}`, `${op2}`];

            

                    const answer7 = Math.floor(Math.random() * choices7.length);

            

                    const embed70000 = new EmbedBuilder()

                    .setTitle("Here is the answer!")

                    .addFields({ name: `User: `, value: `<@${interaction.user.id}>`, inline: true})

                    .addFields({ name: `Answer: `, value: `${choices7[answer7]}`, inline: true})

                    .addFields({ name: "Option 1: ", value: `${op1}`, inline: false})

                    .addFields({ name: "Option 2: ", value: `${op2}`})

                    .setColor("Random")

                    .setTimestamp()

            

                    return interaction.reply({ embeds: [embed70000] });

                

        }

    }

}