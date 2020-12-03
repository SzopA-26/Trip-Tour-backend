const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId
const tourSchema = new mongoose.Schema({
   date: {type: Date, required: true},
   amount: {type: Number, required: true},
   person: {type: Number, required: true},
   job_id: {type: ObjectId, required: true},
   customer_id: {type: ObjectId, required: true}
})

module.exports.model = mongoose.model('Tour', tourSchema)
module.exports.schema = tourSchema