const express = require('express')
const province = require('../controller/Province')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await province.getAll())
   })
   .post(async (req, res) => {
      try {
         await province.create(req.body)
         res.sendStatus(201)
      } catch (e) {
         res.sendStatus(400)
         throw e
      }
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json(await province.getById(req.params.id))
   })

   router.get('/name/:name', async (req, res) => {
      res.status(200).json(await province.getByName(req.params.name))
   })

   router.get('/region/:region', async (req, res) => {
      res.status(200).json(await province.getByRegion(req.params.region))
   })

   return router
}