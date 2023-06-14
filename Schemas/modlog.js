const { model, Schema} = require('mongoose')
 
let modlogSchema = new Schema({
    guildId: { type: String, required: true },
    logChannelId: { type: String, required: true },
})
 
module.exports = model("Modlog", modlogSchema)