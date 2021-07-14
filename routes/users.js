const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()
const OperationResponse = require('../helper/OperationResponse')


router.get('/getAll', async (req, res) => {
  const operationRes = new OperationResponse()
  const users = await prisma.user.findMany()
  operationRes.addResult(users)
  res.send(operationRes)
})

router.get('/create', async (req, res) => {
  res.render('userCreateForm')
})

router.post('/create', async (req, res) => {
  const operationRes = new OperationResponse()
  try {
    console.log(req.body)
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      }
    })
    console.log(user)
    operationRes.addResult(user)
  }
  catch (err) {
    operationRes.addError(err)
  }
  res.send(operationRes)
})





module.exports = router