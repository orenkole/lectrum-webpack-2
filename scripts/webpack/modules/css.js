import env from "postcss-preset-env";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import cssnano from "cssnano";

const loadCss = ({sourceMap = false} = {sourceMap: false}) => (                    {
    loader: 'css-loader',
    options: {
        modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',

        },
        sourceMap
    }
});

const loadPostCss = ({sourceMap = false, minify = false} = {sourceMap: false, minify: false}) => {
    const plugins = [
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
    ];

    if(minify) {
        plugins.push(cssnano);
    }

    return {
        loader: 'postcss-loader',
        options: {
            sourceMap,
            postcssOptions: {
                plugins
            }
        }
    }
}

export const loadDevCss = () =>({
    /**
     * style loader
     * css loader (sourcemap is added)
     * postcss loader
     */
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    loadCss({sourceMap: true}),
                    loadPostCss({sourceMap: true, minify: false }),
                ]
            }
        ]
    },
})

export const loadProdCss = () =>({
    /**
     * mini-css-extract-plugin
     * css loader (minification is added)
     * postcss loader
     */
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    loadCss({sourceMap: false}),
                    loadPostCss({sourceMap: false, minify: true }),
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[id].css',
            chunkFilename: 'css/[name].[id].css',
        })
    ]
});

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
                            modules: {
                                localIdentName: '[path][name]__[local]-[hash:base64:5]'
                            },
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    }
})
