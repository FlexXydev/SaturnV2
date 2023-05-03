const { model, Schema } = require('mongoose');

let ticketSchema = new Schema({
    GuildID: String,
    GuildName: String,
    Channel: String,
    Category: String,
    Role: String
});

module.exports = model("ticket", ticketSchema)