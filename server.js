const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({ dest: './uploads/id_card' })
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { nanoid } = require('nanoid')
const user = require('./controller/User')
const trip = require('./controller/Trip')
const job = require('./controller/Job')
const userRouter = require('./router/User')
const tripRouter = require('./router/Trip')
const jobRouter = require('./router/Job')
const tourRouter = require('./router/Tour')
const provinceRouter = require('./router/Province')
const app = express()

app.use(cors())

mongoose.connect('mongodb://localhost:27017/trip', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let tokens = {}

const authMiddleware = (req, res, next) => {
   // console.log(req.headers.authorization)
   if (Object.values(tokens).indexOf(req.headers.authorization) > -1) {
      next()
   } else res.sendStatus(401)
}

app.post('/api/login', async (req, res) => {
   if (await user.auth(req.body)) {
      let token = nanoid()
      let email = req.body.email
      tokens[email] = token
      res.status(200).send(token)
      console.log("login success");
   } else {
      res.sendStatus(401)
      console.log("login fail");
   }
})


// app.post('/api/img', upload.single('avatar'), async (req, res) => {
//    console.log(req.file.path);
//    res.send(req.body)
// })

app.put('/api/guide/verify/a/:id', async (req, res) => {
   console.log('put');
   try {
      await user.updateGuideVerify(req.params.id)
      res.status(201).send('updated')
   } catch (e) {
      res.sendStatus(400)
      throw e
   }
})

app.get('/api/img', async (req, res) => {
   // console.log('a');
   res.sendFile(req.query.path , { root : __dirname, headers: {'Content-Type': 'image/jpeg'}});
})

app.get('/api/user/token/:token', async (req, res) => {
   if (Object.values(tokens).indexOf(req.params.token) > -1) {
      let index = Object.values(tokens).indexOf(req.params.token)
      let email = Object.keys(tokens)[index]
      let loginUser = await user.getByEmail(email)
      console.log('login ' + loginUser.email);
      res.status(200).send(loginUser)
   } else res.sendStatus(401)
})

app.post('/api/user', async (req, res) => {
   try {
      await user.create(req.body)
      res.sendStatus(201)
   } catch (e) {
      res.sendStatus(400)
      throw e
   }
})

app.post('/api/user/guide', upload.single('selfie_img'), async (req, res) => {
   try {
      await user.createGuide(req.body, req.file)
      res.sendStatus(201)
   } catch (e) {
      res.sendStatus(400)
      throw e
   }
})


app.get('/api/guest/trip', async (req, res) => {
   res.status(200).send(await trip.getAvailableTrip())
})

app.get('/api/job/status/:status', async (req, res) => {
   res.status(200).json(await job.getByStatus(req.params.status))
})

app.get('/api/job/trip/:trip_id/status/:status', async(req, res) => {
   res.status(200).json(await job.getByTripIdStatus(req.params.trip_id, req.params.status))
})

app.use('/api/user', authMiddleware, userRouter())
app.use('/api/trip', authMiddleware, tripRouter())
app.use('/api/job', authMiddleware, jobRouter())
app.use('/api/tour', authMiddleware, tourRouter())
app.use('/api/province', authMiddleware, provinceRouter())

const PORT = 3030
app.listen(PORT, () => {
   console.log('Server is running on PORT ' + PORT)
})