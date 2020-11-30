const Trip = require('../model/Trip').model
const TripSchema = require('../model/Trip').schema

TripSchema.methods.getAll = async () => {
   let trips = await Trip.find({})
   return trips
}

TripSchema.methods.getById = async (id) => {
   let trip = await Trip.findById(id)
   return trip
}

TripSchema.methods.create = async (params) => {
   let trip = new Trip({
      name: params.name,
      address: params.address,
      detail: params.detail,
      start_time: params.start_time,
      end_time: params.end_time,
      price: params.price,
      province_id:  params.province_id,
      meeting_point: params.meeting_point,
      tag: params.tag
   })
   console.log(trip)
   await trip.save((err) => {
      if (err) throw err
      console.log('Create trip success')
   })
   return true
}

module.exports = TripSchema.methods