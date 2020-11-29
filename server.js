const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const userRouter = require('./router/User')

mongoose.connect('mongodb://localhost:27017/trip', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', userRouter())

const PORT = 3000
app.listen(PORT, () => {
   console.log('Server is running on PORT ' + PORT);
})