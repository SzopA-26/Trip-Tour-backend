const User = require('../model/User').model
const UserSchema = require('../model/User').schema
const GuideInfo = require('../model/GuideInfo').model
const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync(8)

UserSchema.methods.auth = async (params) => {
   let user = await User.findOne({ email: params.email })
   if (!user) return false
   return bcrypt.compareSync(params.password, user.password) 
}

UserSchema.methods.getAll = async () => {
   let users = await User.find({})
   return users
}

UserSchema.methods.getById = async (id) => {
   let user = await User.findById(id)
   return user
}

UserSchema.methods.getByEmail = async (email) => {
   let user = await User.findOne({ email: email})
   return user
}

UserSchema.methods.create = async (params) => {
   let user = new User({
      fname: params.fname,
      lname: params.lname,
      email: params.email,
      password: bcrypt.hashSync(params.password, salt),
      img: params.img,
      role: params.role,
      phone_number: params.phone_number,
      birth_date: params.birth_date
   })
   console.log(user)
   await user.save()
}

UserSchema.methods.update = async (params) => {
   let user = await User.findById(params.id)
   if (!user) return false
   user.update({ $set: {
      fname: params.fname,
      lname: params.lname,
      email: params.email,
      img: params.img,
      phone_number: params.phone_number,
      guide_id: params.guide_id,
   }}, (err) => {
      if (err) throw err
      console.log('Update user success')
   }).exec()
}

UserSchema.methods.deleteAll = async () => {
   await User.deleteMany({}, (err) => {
      if (err) throw err
      console.log('Delete all user')
   })
}

UserSchema.methods.createGuide = async (params, file) => {
   let guideInfo = new GuideInfo({
      citizen_id: params.citizen_id,
      selfie_img: './' + file.path,
      type: params.type,
      license_id: params.license_id,
      bankaccount_number: params.bankaccount_number 
   })
   console.log(guideInfo)
   await guideInfo.save()
   let user = new User({
      fname: params.fname,
      lname: params.lname,
      email: params.email,
      password: bcrypt.hashSync(params.password, salt),
      img: params.img,
      role: 'G',
      phone_number: params.phone_number,
      birth_date: params.birth_date,
      guide_id: guideInfo._id,
   })
   console.log(user)
   await user.save()
}

UserSchema.methods.getAllGuide = async () => {
   let guides = await User.find({ role: 'G' })
   return guides
}

UserSchema.methods.updateGuideInfo = async (params) => {
   let guideInfo = await GuideInfo.findById(params.id)
   if (!guideInfo) return false
   guideInfo.update({ $set: {
      status: params.status,
      citizen_id: params.citizen_id,
      type: params.type,
      license_id: params.license_id,
      bankaccount_number: params.bankaccount_number
   }}, (err) => {
      if (err) throw err
      console.log('Update guideInfo success')
   }).exec()
}

UserSchema.methods.getUnverifyGuide = async () => {
   let guides = await User.find({ role: 'G' })
   let unverifyGuides = []
   for (let guide of guides) {
      let guideInfo = await GuideInfo.findById(guide.guide_id)
      if (!guideInfo) {
         console.log(guide);
      }
      if (guideInfo.status === "UNVERIFIED") {
         unverifyGuides.push(guide)
      }
   }
   return unverifyGuides
}

UserSchema.methods.getGuideInfo = async (id) => {
   let guideInfo = await GuideInfo.findById(id)
   return guideInfo
}

UserSchema.methods.updateGuideVerify = async (id) => {
   let guideInfo = await GuideInfo.findById(id)
   if (!guideInfo) return false
   await guideInfo.update({ $set: {
      status: 'AVAILABLE'
   }}, (err) => {
      if (err) throw err
      console.log('Update guide status success')
   }).exec()
}

module.exports = UserSchema.methods