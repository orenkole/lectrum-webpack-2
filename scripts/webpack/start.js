/**
 * 1. webpack
 * 2. webpack-dev-server (under hood: express + webpack-dev-middleware + helpers)
 * 3. webpack-hot-middleware
 * 4. configuration
 * 5. compiler
 * 6. run
 */

const webpack = require('webpack')
const chalk = require('chalk')
const DevServer = require('webpack-dev-server')
const hot = require('webpack-hot-middleware')

const getConfig = require('./webpack.config')
const {HOST, PORT} = require('./constants')

const compiler = webpack(getConfig());

const server = new DevServer(
    {
        host: HOST,
        port: PORT,
        historyApiFallback: true, // redirect to index.html in SPA
        client: {
            logging: 'none', // lessen console info
            overlay: true, // print errors on browser page
        },
    },
    compiler
)



const runServer = async () => {
    console.log('Starting server...');
    await server.start(HOST, PORT, () => {
        console.log(
            `${chalk.greenBright('Server listening on')}
        ${chalk.blueBright(`http://${HOST}:${PORT}`)}`
        )
    });
};

runServer();
