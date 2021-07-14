const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
  res.send('<p>This is an private API.</p>')
})

router.get('/login', async (req, res) => {
  res.send('<p>Login page.</p>')
})



module.exports = router