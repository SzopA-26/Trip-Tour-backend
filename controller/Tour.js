const Tour = require('../model/Tour').model
const TourSchema = require('../model/Tour').schema
const Job = require('../model/Job').model
const Trip = require('../model/Trip').model

TourSchema.methods.getAll = async () => {
   let tours = await Tour.find({})
   return tours
}

TourSchema.methods.getById = async (id) => {
   let tour = await Tour.find({ _id: id })
   return tour
}

TourSchema.methods.getByJobId = async (id) => {
   let tours = await Tour.find({ job_id: id })
   return tours
}

TourSchema.methods.create = async (params) => {
   let job = await Job.findById(params.job_id)
   let trip = await Trip.findById(job.trip_id)
   console.log(job);
   console.log(trip);
   console.log(params.person + job.person);
   if (params.person + job.person <= trip.person) {
      let tour = new Tour({
         date: params.date,
         amount: params.amount,
         person: params.person,
         job_id: params.job_id,
         customer_id: params.customer_id
      })
      console.log(tour);
      await tour.save()
      await job.update({ $set: {
         person: params.person + job.person
      }}, (err) => {
         if (err) throw err
         console.log('Update Job person');
      }).exec()
   }
   else {
      throw new Error('person over trip maximum')
   }
}

module.exports = TourSchema.methods