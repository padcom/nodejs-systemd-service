#!/usr/bin/env node

const express = require('express')
const notify = require('sd-notify')

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

  // The following line tells systemd that the server has reached the point where
  // it is ready to accept connections and thus the service is fully up and running.
  //
  // To utilize this you need to set the [Service] Type=notify which is not possible
  // by default via node-deb overrides. Therefore in this repository there is the
  // nodejs-systemd-example.service file which is identical to the one used by default
  // by node-deb but chnages the aforementioned Type to notify. The template override
  // is in package.json (.node_deb.templates.systemd_service)
  //
  // In addition to the required dependencies the libsystemd-dev package is required
  // so that the native binaries for sd-notify can be built
  // (see package.json, .node_deb.dependencies)

  notify.ready()
})
