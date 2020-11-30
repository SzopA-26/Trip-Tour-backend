const express = require('express')
const trip = require('../controller/Trip')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await trip.getAll())
   })
   .post(async (req, res) => {
      try {
         await trip.create(req.body)
         res.status(201).send("created")
      } catch (e) {
         res.sendStatus(400)
      }
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json(await trip.getById(req.params.id))
   })

   return router
}