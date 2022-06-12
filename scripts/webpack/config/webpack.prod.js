import * as modules from "../modules";

import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {merge} from 'webpack-merge';
import getCommonConfig from './webpack.common';

import {
    BUILD_DIRECTORY,
    PROJECT_ROOT
} from "../constants";
import {connectBundleAnalyzer} from "../utils";

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
        },
        modules.loadProdCss(),
        modules.optimizeBuild(),
        modules.optimizeImages(),
        connectBundleAnalyzer(),
    )
}
