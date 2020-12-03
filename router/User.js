const express = require('express')
const user = require('../controller/User')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await user.getAll())
   })
   .put(async (req, res) => {
      try {
         await user.update(req.body)
         res.status(201).send('updated')
      } catch (e) {
         res.sendStatus(400)
         throw e
      }
   })
   .delete(async(req, res) => {
      try {
         await user.deleteAll()
         res.status(201).send('deleted')
      } catch (e) {
         res.sendStatus(400)
         throw e
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
         throw e
      }
   })

   router.get('/guide/guideInfo/:guideInfo', async (req, res) => {
      res.status(200).json(await user.getGuideInfo(req.params.guideInfo))
   })

   router.get('/guide/unverify', async (req, res) => {
      res.status(200).json(await user.getUnverifyGuide())
   })

   return router
}