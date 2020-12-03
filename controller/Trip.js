const Trip = require('../model/Trip').model
const TripSchema = require('../model/Trip').schema
const JobController = require('../controller/Job')

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
      tag: params.tag,
      person: params.person,
      img: '',
   })
   console.log(trip)
   await trip.save()
}

TripSchema.methods.getAvailableTrip = async () => {
   let availableTrips = []
   let trips = await Trip.find({})
   for (let trip of trips) {
      let jobs = await JobController.getByTripId(trip._id, 'PENDING')
      for (let job of jobs) {
         let amount = job.person
         if (amount < trip.person && availableTrips.indexOf(trip) === -1) {
            availableTrips.push(trip)
         }
      }
   }
   return availableTrips
}

module.exports = TripSchema.methods