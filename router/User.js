const express = require('express')
const user = require('../controller/User')

module.exports = () => {
   const router = express.Router()

   router.route('/')
   .get(async (req, res) => {
      res.status(200).json(await user.getAll())
   })
   .post(async (req, res) => {
      if (await user.create(req.body)) res.status(201).send("created")
   })
   .put(async (req, res) => {
      if (await user.update(req.body)) res.status(201).send("updated")
   })
   .delete(async(req, res) => {
      if (await user.deleteAll()) res.status(200).send("deleted")
   })

   router.get('/:id', async (req, res) => {
      res.status(200).json(await user.getById(req.params.id))
   })

   return router
}