const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()
const OperationResponse = require('../helper/OperationResponse')
const operationRes = new OperationResponse()

router.get('/create/:id', async (req, res) => {
  const params = {}
  params.id = req.params.id
  res.render('expenseCreateForm', params)
})

router.post('/create', async (req, res) => {

  try {
    console.log(req.body)
    const { description, price, id } = req.body
    const expense = await prisma.expense.create({
      data: {
        description: description,
        price: parseFloat(price),
        user: { connect: { id: id } }
      }
    })
    console.log(expense)
  }
  catch (err) {
    console.log(err)
    operationRes.addError(err)
    res.send(operationRes)
  }
  res.send('<p>Expense created successfully</p>')
})





module.exports = router