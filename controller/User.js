const User = require('../model/User').model
const UserSchema = require('../model/User').schema

UserSchema.methods.getAll = async () => {
   const users = await User.find({})
   console.log(users)
   return users
}

UserSchema.methods.create = async (params) => {
   let user = new User({
      id: params.id,
      fname: params.fname,
      lname: params.lname,
      email: params.email,
   })
   console.log(user);
   await user.save((err) => {
      if (err) return console.log(err)
      console.log('Create user success');
   });
}

module.exports = UserSchema.methods