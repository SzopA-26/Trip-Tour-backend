const express = require('express')
const user = require('../controller/User')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await user.getAll())
   })
   .post(async (req, res) => {
      try {
         await user.create(req.body)
         res.sendStatus(201)
      } catch (e) {
         res.sendStatus(400)
      }
   })
   .put(async (req, res) => {
      try {
         await user.update(req.body)
         res.status(201).send('updated')
      } catch (e) {
         res.sendStatus(400)
      }
   })
   .delete(async(req, res) => {
      try {
         await user.deleteAll()
         res.status(201).send('deleted')
      } catch (e) {
         res.sendStatus(400)
      }
   })

   router.get('/id/:id', async (req, res) => {
      console.log(req.params.id);
      res.status(200).json(await user.getById(req.params.id))
   })

   router.route('/guide')
   .get(async (req, res) => {
      res.status(200).json(await user.getAllGuide())
   })
   .put(async (req, res) => {
      try {
         await user.updateGuideInfo(req.body)
         res.status(201).send('updated')
      } catch (e) {
         res.sendStatus(400)
      }
   })

   return router
}