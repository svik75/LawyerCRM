const express = require('express')
const keys = require('./config/key')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoute = require('./routes/authroute')
const queryRoute = require('./routes/queryroute')
const claimRoute = require('./routes/claimroute')
const contractRoute = require('./routes/contractroute')
const buhRoute = require('./routes/buxgalterrouter')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
.then(() => console.log('MongoDB connected!'))
.catch(error => console.log(error))

app.use(passport.initialize())
require('./controllers/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth', authRoute)
app.use('/api/query', queryRoute)
app.use('/api/claim', claimRoute)
app.use('/api/contract', contractRoute)
app.use('/api/mailer', buhRoute)


module.exports = app;