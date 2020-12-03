const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
const jobSchema = new mongoose.Schema({
   person: {type: Number, default: 0, required: true},
   status: {type: String, enum: ['PENDING', 'SUCCESS'], default: 'PENDING', required: true},
   date: {type: Date, required: true},
   trip_id: {type: ObjectId, required: true},
   guide_id: {type: ObjectId, required: true}
})

module.exports.model = mongoose.model('Job', jobSchema)
module.exports.schema = jobSchema