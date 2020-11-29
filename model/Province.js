const mongoose = require('mongoose')

const provinceSchema = new mongoose.Schema({
   name: { type: String, required: true},
   region:{ type: String, enum: ['N', 'S', 'E', 'W', 'NE', 'C'], require: true}
})

module.exports.model = mongoose.model('Province', provinceSchema)
module.exports.schema = provinceSchema