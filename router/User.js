const express = require('express')
const user = require('../controller/User')

module.exports = () => {
   const router = express.Router()

   router.get('/', async (req, res) => {
      res.status(200).json({users: await user.getAll()})
   })

   router.post('/create', async (req, res) => {
      await user.create(req.body)
      res.send("Created")
   })

   return router
}