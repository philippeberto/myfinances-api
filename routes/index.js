const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.send('<p>This is an private API.</p>')
})

router.get('/login', async (req, res) => {
  res.send('<p>Login page.</p>')
})

router.get('/createUser', async (req, res) => {
  const user = new Parse.User()
  user.set("username", "my name")
  user.set("password", "my pass")
  user.set("email", "email@example.com")

  // other fields can be set just like with Parse.Object
  user.set("phone", "415-392-0202")
  try {
    await user.signUp()
    // Hooray! Let them use the app now.
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message)
  }
})

router.post('/despesa/create', async (req, res) => {
  const Despesa = Parse.Object.extend('Despesas')
  const despesa = new Despesa()
  despesa.set('name', req.body.name)
  despesa.set('price', req.body.price)
  despesa.set('category', req.body.category)
  despesa.set('tags', req.body.tags)
  const result = await despesa.save()
  res.send(result)
})

module.exports = router