const express = require('express');

const app = express();
const bodyParser = require('body-parser')
var routes = require('./config/routes');
// var hostName="splog.sdssoftltd.co.uk"
let PORT = process.env.PORT||8080;
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 
app.set('view engine', 'ejs')

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Example app listening at https://zoom-api-server.herokuapp.com:${PORT}`)
})