const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, default: Date.now(), required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref:'User', required: true }
})

MessageSchema
    .virtual('formattedDate')
    .get(function(){
        return moment(this.timestamp).format('DD/MM/YYYY, h:mm a');
    });

module.exports = mongoose.model('Message', MessageSchema);