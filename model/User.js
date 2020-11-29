const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   fname: { type: String, required: true},
   lname: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   img: { type: String },
   role: { type: String, enum: ['A', 'C', 'G'], default: 'C'},
   phone_number: { type: String, required: true },
   birth_date: { type: Date, required: true},
   guid_id: {type: String}
   // hashed_password: { type: String, default: '' },
})

module.exports.model = mongoose.model('User', userSchema)
module.exports.schema = userSchema