const User = require('../model/User').model
const UserSchema = require('../model/User').schema

UserSchema.methods.getAll = async () => {
   const users = await User.find({})
   return users
}

UserSchema.methods.getById = async (id) => {
   const user = await User.findById(id)
   return user
}

UserSchema.methods.create = async (params) => {
   let user = new User({
      fname: params.fname,
      lname: params.lname,
      email: params.email,
      img: params.img,
      role: params.role,
      phone_number: params.phone_number,
   })
   console.log(user);
   await user.save((err) => {
      if (err) throw err;
      console.log('Create user success');
   });
}

UserSchema.methods.update = async (params) => {
   let user = await User.findById(params.id)
   user.update({ $set: {
      fname: params.fname,
      lname: params.lname,
      email: params.email,
      img: params.img,
      phone_number: params.phone_number
   }}, (err) => {
      if (err) throw err
      console.log('Update user success'); 
   }).exec()
}

UserSchema.methods.deleteAll = async () => {
   await User.deleteMany({}, (err) => {
      if (err) throw err;
      console.log('Delete all user');
   })
}

module.exports = UserSchema.methods