/**
 * 1. webpack
 * 2. webpack-dev-server (under hood: express + webpack-dev-middleware + helpers)
 * 3. webpack-hot-middleware
 * 4. configuration
 * 5. compiler
 * 6. run
 */

import webpack from 'webpack';
import chalk from 'chalk';
import DevServer from 'webpack-dev-server';
import hot from 'webpack-hot-middleware';

import getDevConfig from './config/webpack.dev';
import {choosePort} from "./utils";
import {HOST, PORT} from './constants';

const compiler = webpack(getDevConfig());

(async () => {
    try {
        const selectedPort = await choosePort(PORT);

        if(!selectedPort) {
            console.log(chalk.yellowBright(
                `It's impossible to run the app`
            ))
            return null
        }

        const server = new DevServer(
            {
                host: HOST,
                port: selectedPort,
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
                    `${chalk.greenBright('Server listening on')} ${chalk.blueBright(`http://${HOST}:${PORT}`)}`
                )
            });
        };

        runServer();
    } catch(err) {
        console.log(chalk.redBright('Error'))
        console.log((err.message || err))
    }
})()
