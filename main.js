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

  if (require('is-systemd')) {
    // The following line tells systemd that the server has reached the point where
    // it is ready to accept connections and thus the service is fully up and running.
    //
    // To utilize this you need to set the [Service] Type=notify which is not possible
    // by default via node-deb overrides. Therefore in this repository there is the
    // nodejs-systemd-example.service file which is almost identical to the one used by
    // default by node-deb but chnages the aforementioned Type to notify.
    // The template override is in package.json (.node_deb.templates.systemd_service).
    // Another useful feature is the timeout to start. In this example the overriden
    // template contains the [Service] TimeoutStartSec=5 which means that if the service
    // will not start in 30 seconds something's wrong.
    //
    // Additionally, if the service gets stuck for some reason it should probably be
    // restarted. For that we have the [Service] WatchdogSec=3 setting in the service
    // description file. There are two ways to use it:
    // - setTimeout/setInterval and call the notify.watchdog() method
    // - notify.startWatchdogMode(ms) which will do the above automatically (used in
    //   this example)
    //
    // In addition to the required dependencies the libsystemd-dev package is required
    // so that the native binaries for sd-notify can be built
    // (see package.json, .node_deb.dependencies)

    const notify = require('sd-notify')
    console.log('Notifying systemd that the process started successfully')
    notify.ready()
    console.log('Starting watchdog timer')
    notify.startWatchdogMode(2800)
  } else {
    console.log('Running in Docker - skipping systemd setup')
  }
})
