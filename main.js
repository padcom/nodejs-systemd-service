#!/usr/bin/env node

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world! in ' + process.env.NODE_ENV + 'with hidden message ' + process.env.MESSAGE + '\n')
  console.log('Hello, world! in ', process.env.NODE_ENV)
  console.log('Hidden message', process.env.MESSAGE)
})

app.get('/kill', (req, res) => {
  res.send('Killing app' + '\n')
  console.log('Shutting down application')
  process.exit()
})

const listener = app.listen(process.env.PORT || 3000, (...args) => {
  console.log('Example application listening on port', listener.address().port)
})
