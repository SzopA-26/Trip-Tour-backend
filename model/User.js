const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
const userSchema = new mongoose.Schema({
   fname: { type: String, required: true},
   lname: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true},
   img: { type: String },
   role: { type: String, enum: ['A', 'C', 'G'], default: 'C'},
   phone_number: { type: String, required: true },
   birth_date: { type: Date, required: true},
   guide_id: { type: ObjectId}
   // hashed_password: { type: String, default: '' },
})

module.exports.model = mongoose.model('User', userSchema)
module.exports.schema = userSchema