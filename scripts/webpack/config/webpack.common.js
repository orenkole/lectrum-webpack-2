import DotenvWebpack from "dotenv-webpack";
import merge from "webpack-merge";

import {
    BUILD_DIRECTORY,
    SOURCE_DIRECTORY,
    PROJECT_ROOT
} from "../constants";
import * as modules from "../modules";

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
            },
            plugins: [
                new DotenvWebpack(),
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
