const { model, Schema } = require("mongoose");

let todoSchema = new Schema({
    User: String,
    Message: String,
    MessageDate: String,
});

module.exports = model("todo", todoSchema);