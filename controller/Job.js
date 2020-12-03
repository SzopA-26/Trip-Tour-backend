const Job = require('../model/Job').model
const JobSchema = require('../model/Job').schema
const Tour  = require('../model/Tour').model

JobSchema.methods.getAll = async () => {
   let jobs = await Job.find({})
   return jobs
}

JobSchema.methods.getById = async (id) => {
   let job = await Job.findById(id)
   return job
}

JobSchema.methods.getByGuideId = async (id) => {
   let jobs = await Job.find({ guide_id: id})
   return jobs
}

JobSchema.methods.getByTripId = async (trip_id) => {
   let jobs = await Job.find({ trip_id: trip_id})
   return jobs
}

JobSchema.methods.getByStatus = async (status) => {
   let jobs = await Job.find({ status: status })
   return jobs
}

JobSchema.methods.getByTripIdStatus = async (trip_id, status) => {
   let jobs = await Job.find({ trip_id: trip_id, status: status })
   return jobs
}

JobSchema.methods.create = async (params) => {
   let job = new Job({
      date: params.date,
      trip_id: params.trip_id,
      guide_id: params.guide_id
   })
   console.log(job);
   await job.save()
}

JobSchema.methods.update = async (params) => {
   let job = await Job.findById(params._id)
   if (!job) return false
   await job.update({ $set: {
      person: params.person,
      status: params.status
   }}, (err) => {
      if (err) throw err
      console.log('Update job success');
   }).exec()
}

JobSchema.methods.getAllTourPerson = async (id) => {
   let job = await Job.findById(id)
   let tours = await Tour.find({ job_id: job._id })
   let person = 0
   tours.map((t) => person += t.person)
   return person
}

module.exports = JobSchema.methods