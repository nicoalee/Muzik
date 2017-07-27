// load .env file
require('dotenv').config()

// external modules----------------------------------
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const bdypsr = require('body-parser')
const flash = require('connect-flash')
// internal modules----------------------------------
const userRoute = require('./routes/userRoute')
const playlistRoute = require('./routes/playlistRoute')
const passport = require('./config/passport')
const songRoute = require('./routes/songRoute')

// extra stuff----------------------------------
const app = express()
const url = process.env.MLAB_URI || 'mongodb://localhost/muzak'

// setup mongoose----------------------------------
mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('...connected to database successfully')
  },
  function (err) {
    console.log(err)
  })
app.use(express.static('public'))

// setup session----------------------------------
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUinitialized: true,
  store: new MongoStore({
    url: process.env.MLAB_URI
    // 'mongodb://localhost/muzak'
  })
}))

// setup passport----------------------------------
app.use(passport.initialize())
app.use(passport.session())

// setup handlebars----------------------------------
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// set up body parser----------------------------------
// listen to ajax request
// app.use(bdypsr.json())
  // allows us to read the form
// app.use(bdypsr.urlencoded({extended: true}))

// setup flash----------------------------------
// don't need to write anymore. Flash will always appear
app.use(flash())
app.use(function (req, res, next) {
  app.locals.flash = req.flash('msg')
  app.locals.user = req.user
  next()
})

// setup user Route----------------------------------
app.use('/user', userRoute)

// setup song Route----------------------------------
app.use('/song', songRoute)

// setup playlist route----------------------------------
app.use('/playlist', playlistRoute)

// connect to port ----------------------------------
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log(`...successfully connected to port ${port}`)
})
