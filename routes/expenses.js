const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/create', async (req, res) => {
  res.render()
})

router.post('/create', async (req, res) => {
  res.send('<p>This is an private API.</p>')
})





module.exports = router