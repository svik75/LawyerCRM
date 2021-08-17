const express = require('express')
const keys = require('./config/key')
const app = express()
const mongoose = require('mongoose')
var admin = require('firebase-admin'); // firebase admin
var serviceAccount = require("./config/vashurist.json");
const authRoute = require('./routes/authroute')
const queryRoute = require('./routes/queryroute')
const claimRoute = require('./routes/claimroute')
const contractRoute = require('./routes/contractroute')
const buhRoute = require('./routes/buxgalterrouter')
// const vuRoute = require('./routes/vashuristrouter')

const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
.then(() => console.log('MongoDB connected!'))
.catch(error => console.log(error))

var fireadmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vashuristmoskva-e03a6.firebaseio.com"
  });

  console.log('fireadmin connected:'+fireadmin.name );
  // admin.auth().setCustomUserClaims('bm6huMldB3PY5Nxz1CGEgE1m9AW2', {admin: true}).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
  // });
 
app.use(passport.initialize())
require('./controllers/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/query', queryRoute)
app.use('/api/claim', claimRoute)
app.use('/api/contract', contractRoute)
app.use('/api/mailer', buhRoute)
// app.use('/api/mailerl', vuRoute)


module.exports = app;