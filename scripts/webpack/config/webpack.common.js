const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    PROJECT_ROOT
} = require("../constants");

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
        output: {
            // needed for clean-webpack-plugin
            path: BUILD_DIRECTORY,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./static/template.html",
                title: "Lear webpack",
                favicon: "./static/favicon.ico"
            }),
        ]
    }
}