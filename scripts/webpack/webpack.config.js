const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    PROJECT_ROOT
} = require("./constants");

const cleanOptions = {
    verbose: true,
    root: PROJECT_ROOT,
}

module.exports = () => {
    return {
        entry: SOURCE_DIRECTORY,
        output: {
            path: BUILD_DIRECTORY,
            filename: "bundle.js",
        },
        mode: 'none',
        devtool: false,
        output: {
            // needed for clean-webpack-plugin
            path: BUILD_DIRECTORY,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./static/template.html",
                title: "Lear webpack",
                favicon: "./static/favicon.ico"
            }),
            // There is native webpack alternative to clean-webpack-plugin https://github.com/johnagan/clean-webpack-plugin/issues/194#issuecomment-781517478
            new CleanWebpackPlugin({BUILD_DIRECTORY, ...cleanOptions})
        ]
    }
}
