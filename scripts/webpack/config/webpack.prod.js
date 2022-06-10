const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {merge} = require('webpack-merge')
const getCommonConfig = require('./webpack.common')

const {
    BUILD_DIRECTORY,
    PROJECT_ROOT
} = require("../constants");

const cleanOptions = {
    verbose: true,
    root: PROJECT_ROOT,
}

module.exports = () => {
    return merge(
        getCommonConfig(),
        {
            mode: 'none',
            devtool: false,
            plugins: [
                new CleanWebpackPlugin({BUILD_DIRECTORY, ...cleanOptions})
            ]
        }
    )
}
