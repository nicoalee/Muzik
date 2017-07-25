// external modules
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const express = require('express')
// internal modules

// extra stuff
const app = express()
app.use(express.static('public'))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('index')
})

const port = 3000
var server = app.listen(port, function () {
  console.log(`...successfully connected to port ${port}`)
})
