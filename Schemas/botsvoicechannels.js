const { model, Schema } = require('mongoose');
 
let botvoiceschema = new Schema ({
    Guild: String,
    BotChannel: String,
    ChannelName: String
})
 
module.exports = model('botvoicechannels', botvoiceschema);
