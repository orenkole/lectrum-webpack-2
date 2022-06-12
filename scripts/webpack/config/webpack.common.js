import DotenvWebpack from "dotenv-webpack";
import merge from "webpack-merge";

import {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    PROJECT_ROOT
} from "../constants";
import * as modules from "../modules";
import {DefinePlugin} from "webpack";

const cleanOptions = {
    verbose: true,
    root: PROJECT_ROOT,
}

module.exports = () => {
    const {NODE_ENV} = process.env;

    return merge(
        {
            entry: SOURCE_DIRECTORY,
            output: {
                path: BUILD_DIRECTORY,
                filename: "js/bundle.js",
                publicPath: "/",
            },
            plugins: [
                new DotenvWebpack(),
                new DefinePlugin({
                    __ENV__: JSON.stringify(NODE_ENV),
                    __DEV__: NODE_ENV === 'development',
                    __PROD__: NODE_ENV === 'production',
                })
            ]
        },
        modules.loadFonts(),
        modules.loadJavascript(),
        modules.loadSass(),
        modules.loadImages(),
        modules.loadSvg(),
        modules.setupHtml(),
    )
}
