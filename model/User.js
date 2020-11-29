const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   id: { type: String, unique: true },
   fname: { type: String },
   lname: { type: String },
   email: { type: String, unique: true },
   // hashed_password: { type: String, default: '' },
   // role: {type: String, default: 'CUSTOMER'}
});

module.exports.model = mongoose.model('User', userSchema)
module.exports.schema = userSchema