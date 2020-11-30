const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const { nanoid } = require('nanoid')
const user = require('./controller/User')
const userRouter = require('./router/User')
const tripRouter = require('./router/Trip')
const app = express()

mongoose.connect('mongodb://localhost:27017/trip', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// let tokens = {}

// const authMiddleware = (req, res, next) => {
//    console.log(req.headers.authorization)
//    if (Object.values(tokens).indexOf(req.headers.authorization) > -1) {
//       next()
//    } else res.sendStatus(401)
// }

// app.post('/api/login', async (req, res) => {
//    if (await user.auth(req.body)) {
//       let token = nanoid()
//       let email = req.body.email
//       tokens[email] = token
//       res.json({
//          _token: token
//       })
//    } else {
//       res.status().send("login fail")
//    }
// })

app.post('/api/user', async (req, res) => {
   if (await user.create(req.body)) res.sendStatus(201)
   else res.sendStatus(400)
})

app.post('/api/user/guide', async (req, res) => {
   if (await user.createGuide(req.body)) res.sendStatus(201)
   else res.sendStatus(400)
})

// app.use('/api/user', authMiddleware, userRouter())
app.use('/api/user', userRouter())
app.use('/api/trip', tripRouter())

const PORT = 3030
app.listen(PORT, () => {
   console.log('Server is running on PORT ' + PORT)
})