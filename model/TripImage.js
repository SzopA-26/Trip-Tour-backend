const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
const tripImageSchema = new mongoose.Schema({
   image: { type: String, required: true },
   trip_id: {type: ObjectId, required: true}
})

module.exports.model = mongoose.model('TripImage', tripImageSchema)
module.exports.schema = tripImageSchema