const SenecaWeb = require('seneca-web');
const express = require('express')();
const cors = require('cors');
const Routes = require('./routes')

express
    .use(cors())

const senecaWebConfig = {
    routes : Routes,
    adapter: require('seneca-web-adapter-express'),
    context: express,
    options: {}
}

const seneca = require('seneca')()
    .client({ type: 'tcp', pin: 'role: core' })
    .client({ port:5010, pin: { role: "user-store", cmd:'*' } })
    .client({ port:5020, pin: { role: "product-store", cmd:'*' } })
    .use(SenecaWeb, senecaWebConfig)
    .use('./api.js', {message: "Plugin api added"})
    .ready(() => {
        const server = seneca.export('web/context')()
        server.listen('4000', () => {
            console.log('server started on: 4000')
        })
    })