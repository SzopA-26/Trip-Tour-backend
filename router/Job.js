const express = require('express')
const job = require('../controller/Job')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await job.getAll())
   })
   .post(async (req, res) => {
      try {
         console.log(req.body);
         await job.create(req.body)
         res.sendStatus(201)
      } catch (e) {
         res.sendStatus(400)
         throw e
      }
   })
   .put(async (req, res) => {
      try {
         console.log(req.body);
         await job.update(req.body)
         res.status(201).send('updated')
      } catch (e) {
         res.sendStatus(400)
         throw e
      }
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json(await job.getById(req.params.id))
   })

   router.get('/trip/:trip_id', async (req, res) => {
      res.status(200).json(await job.getByTripId(req.params.trip_id))
   })

   router.get('/guide/:guide_id', async (req, res) => {
      res.status(200).json(await job.getByGuideId(req.params.guide_id))
   })

   return router
}