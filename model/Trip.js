const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
const tripSchema = new mongoose.Schema({
   name: { type: String, required: true },
   address: { type: String, required: true },
   detail: { type: String },
   start_time: { type: String, required: true },
   end_time: { type: String, required: true },
   price: { type: Number, required: true },
   province_id: { type: ObjectId, required: true },
   // province: [{type: mongoose.Schema.Types.ObjectId, ref: "Province"}],
   meeting_point: { type: String, required: true},
   person: {type: Number, required: true},
   img: {type: String},
   tag: { type: String, enum: [
      'Art & Craft Workshops',
      'Cooking',
      'Fitness & Wellness',
      'Food & Drink',
      'Fun & Adventure',
      'History & Culture',
      'Local Life',
      'Local Ride',
      'Nature',
      'Night Activites',
      'Shopping'
   ], required: true}
})

module.exports.model = mongoose.model('Trip', tripSchema)
module.exports.schema = tripSchema