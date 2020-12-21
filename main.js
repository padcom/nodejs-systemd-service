#!/usr/bin/env node

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world! in ' + process.env.NODE_ENV + '\n')
  console.log('Hello, world! in ', process.env.NODE_ENV)
  console.log('Hidden message', process.env.MESSAGE)
})

app.get('/kill', (req, res) => {
  res.send('Killing app' + '\n')
  console.log('Shutting down application')
  process.exit()
})

app.listen(3000, () => {
  console.log('Example application listening on port 3000')
})
