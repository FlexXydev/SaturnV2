const { model, Schema } = require ('mongoose');

let serverSchema = new Schema({
    TotserverCount: { type: String, required: true },
    totmemberCount: { type: Number, required: true },
    totcommands: { type: Number, required: true }
  });
  
module.exports = model('serverSchema', serverSchema);
  