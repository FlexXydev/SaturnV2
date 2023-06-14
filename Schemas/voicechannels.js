const { model, Schema } = require("mongoose");
 
let voicechannelschema = new Schema({
    Guild: String,
    TotalChannel: String,
    ChannelName: String
})
 
module.exports = model("voicechannelschema", voicechannelschema);