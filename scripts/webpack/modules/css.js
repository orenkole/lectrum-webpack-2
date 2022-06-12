import env from "postcss-preset-env";

export const loadCss = () => ({
    module: {
        rules: [
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
            },
        ]
    }
})

export const loadSass = () => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]-[hash:base64:5]'
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    }
})
