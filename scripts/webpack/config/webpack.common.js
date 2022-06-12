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
                    RELEASE: '2.0',
                    TWO: '1+1',
                    THREE: JSON.stringify(3),
                    FOUR: 4,
                    TRUE_SIMPLE: true,
                    TRUE_STRINGIFIED: JSON.stringify(true),
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
