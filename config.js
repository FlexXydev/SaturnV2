module.exports = {
    clients: {
        activity: 'Loading..',
        activityfr: 'En développement',
        activityen: 'In development',
        name: "Saturn",
        logo: "https://media.discordapp.net/attachments/1058850782188933242/1101224929111838811/20230427_211136_0000.png",
    },
    
    db : {
      	dbUri: 'mongodb+srv://root:root@saturnbot.v331ybb.mongodb.net/?retryWrites=true&w=majority'  
    },
    
    apikey : {
      openaikey : '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',  
    },

    giveaway: {
        hostedBy: true,
        everyoneMention: true
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    },

    token: 'MTA5MTA2MTM0NDIyNjI1NDg5OA.Gewksm.51VtProwmjrCJh4Tbpts_jI6_5DeUQx-YojOXw'
};