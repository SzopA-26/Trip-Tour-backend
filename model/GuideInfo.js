const mongoose = require('mongoose');

const guideInfoSchema = new mongoose.Schema({
   citizen_id: { type: String, required: true },
   passport_id: { type: String, required: true },
   selfie_img: { type: String, required: true },
   type: { type: String, enum: [
      'SILVER', 
      'GOLD', 
      'PINK',
      'BULE', 
      'GREEN', 
      'RED',
      'ORANGE', 
      'YELLOW',
      'PURPLE',
      'BROWN'
   ], required: true },
   license_id: { type: String, required: true },
   bankaccount_number: { type: String, required: true } 
})

module.exports.model = mongoose.model('GuideInfo', guideInfoSchema)
module.exports.schema = guideInfoSchema