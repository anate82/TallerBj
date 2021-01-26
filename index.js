process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen
require('dotenv').config() //permite tener un archivo para guardar variables globales

const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet');

// NONGOOSE
mongoose.connect(process.env.MONGO_URL,
  {
    dbName: process.env.MONGO_DB || 'test',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, err => {
    if (err) { throw new Error(err) }
    console.info('💾 Connected to Mongo Database \n')
  })

// ADDING MIDDLEWARES & ROUTER
const app = express()
  .use(helmet())
  .use(cors())
  .use(morgan('combined')) 
  .use(express.json()) //parser a recoger nuestra peticion
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api', require('./api/routes'))

// Init server
const PORT = process.env.PORT || 2222 //elige un puerto u otro
app.listen(PORT, (err) => {
  if (err) { throw new Error(err) }
  console.info('>'.repeat(40))
  console.info('💻  Server Live')
  console.info(`📡  PORT: http://localhost:${PORT}`)
  console.info('>'.repeat(40) + '\n')
})
