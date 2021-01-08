const express = require('express')
const router = express.Router()
const apiRouts=  require("../api/resources/index");
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.render("../src/views/index.ejs" , {user:{firstName:'Prakash', lastName:'Singh'}})
})
// define the about route
// router.get('/api', function (req, res) {
//   res.send('About birds')
// })

router.use("/api",apiRouts);

module.exports = router