const express = require('express')
const middleWare = require('./routes/middleware')
const path = require('path')
require('dotenv').config()
const cors = require('cors')

const IndexRouter = require('./routes/index')
const ExpenseRouter = require('./routes/expenses')
const UserRouter = require('./routes/users')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

console.log(__dirname)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//app.use(middleWare.checkUserLoggedIn)

app.use('/', IndexRouter)
app.use('/expenses', ExpenseRouter)
app.use('/users', UserRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.PORT}...`)
})