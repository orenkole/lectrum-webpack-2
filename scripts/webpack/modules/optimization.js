import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import { extendDefaultPlugins } from "svgo";
import TerserPlugin from "terser-webpack-plugin";
import {ContextExclusionPlugin} from "webpack";

export const optimizeBuild = () => ({
    optimization: {
        nodeEnv: 'production',
        minimize: false,
        minimizer: [ new TerserPlugin({
            terserOptions: {
                safari10: true,
            }
        }) ],
        // noEmitOnError: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        removeAvailableModules: true,
        concatenateModules: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        splitChunks: {
            chunks: 'all',
        }
    }
})

export const optimizeImages = () => ({
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
})

export const filterMomentLocales = () => ({
    plugins: [ new ContextExclusionPlugin(/moment\/locale$/, /(en)/)]
})
