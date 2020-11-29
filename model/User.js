const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   fname: { type: String, required: true},
   lname: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   img: { type: String },
   role: { type: String, enum: ['A', 'C', 'G'], default: 'C'},
   phone_number: { type: String, required: true },
   // hashed_password: { type: String, default: '' },
   // role: {type: String, default: 'CUSTOMER'}
});

module.exports.model = mongoose.model('User', userSchema)
module.exports.schema = userSchema