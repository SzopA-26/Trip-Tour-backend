const express = require('express')
const tour = require('../controller/Tour')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).send(await tour.getAll())
   })
   .post(async (req, res) => {
      try {
         console.log(req.body);
         await tour.create(req.body)
         res.sendStatus(201)
      } catch (e) {
         res.sendStatus(400)
         throw e
      }
   })

   router.get('/:id', async (req, res) => {
      res.status(200).send(await tour.getById(req.params.id))
   })

   router.get('/job/:job_id', async (req, res) => {
      res.status(200).send(await tour.getByJobId(req.params.job_id))
   })

   return router
}