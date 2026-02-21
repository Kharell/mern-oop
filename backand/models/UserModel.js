const mongose = require('mongoose');


const userSchema = new mongose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongose.model('User', userSchema);