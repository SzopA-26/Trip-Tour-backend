const express = require('express')
const trip = require('../controller/Trip')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json({trips: await trip.getAll()})
   })
   .post(async (req, res) => {
      await trip.create(req.body)
      res.send(true)
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json({trip: await trip.getById(req.params.id)})
   })

   return router
}