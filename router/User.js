const express = require('express')
const user = require('../controller/User')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json({users: await user.getAll()})
   })
   .post(async (req, res) => {
      await user.create(req.body)
      res.send(true)
   })
   .put(async (req, res) => {
      await user.update(req.body)
      res.send(true)
   })
   .delete(async(req, res) => {
      await user.deleteAll()
      res.send(true)
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json({user: await user.getById(req.params.id)})
   })


   return router
}