/**
 * 1. webpack
 * 2. config
 * 3. create webpack compiler
 * 4. execution
 */

import webpack from 'webpack';
import chalk from 'chalk';

import getProdConfig from './config/webpack.prod';

const compiler = webpack(getProdConfig());

compiler.run((error, stats) => {
    // error = error of webpack configuration
    if (error) {
        console.error(error.stack || error)

        if (error.details) {
            console.error(error.details);
        }
        return null;
    }

    const info = stats.toString({
        hash: true,
        modules: false,
    })

    console.log(chalk.greenBright('Build completed'))
    console.log(info)

    if (stats.hasErrors()) {
        console.log(chalk.redBright('Error'))
    }

    if (stats.hasWarnings()) {
        console.log(chalk.yellowBright('Warning'))
    }
});
