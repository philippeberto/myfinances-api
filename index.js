const express = require('express')
const ParseServer = require('parse-server').ParseServer
const Parse = require('parse/node')
const middleWare = require('./routes/middleware')
//const path = require('path')
require('dotenv').config()
const cors = require('cors')

const IndexRouter = require('./routes/index')

const session = require('express-session')

var sess = {
  name: 'myfin_session',
  secret: 'H48De94&Bv[fO^a',
  cookie: { maxAge: 190000000 },
  resave: true,
  saveUninitialized: true,
}
sess.cookie.secure = false


const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.')
}

const config = {
  databaseURI: databaseUri,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.MONGODB_APP_ID,
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  // liveQuery: {
  //   classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  // },
}

const app = express()

app.use(session(sess))

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse'
const api = new ParseServer(config)
// make the Parse Server available at /parse

app.use("/parse", api)

app.use(mountPath, api)

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(middleWare.checkUserLoggedIn)

app.use('/', IndexRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.PORT}...`)
})