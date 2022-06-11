import HtmlWebpackPlugin from 'html-webpack-plugin'
import env from 'postcss-preset-env'

import {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    PROJECT_ROOT
} from "../constants";

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
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5',
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    env({
                                        stage: 0,
                                        features: {
                                            'custom-media-queries': {
                                                importFrom: [{
                                                    customMedia: {
                                                        '--phonePortrait':
                                                            '(width <= 414px)',
                                                    }
                                                }]
                                            }
                                        }
                                    })
                                ]
                            }
                        }
                    ]
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
