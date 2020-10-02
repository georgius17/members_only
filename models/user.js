const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    username: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true },
    membership: { type: Boolean, default: false, required: true },
    admin: { type: Boolean, default: false, required: true }
})

module.exports = mongoose.model('User', UserSchema);