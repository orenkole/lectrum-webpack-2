import * as modules from "../modules";

import {merge} from 'webpack-merge';
import getCommonConfig from "./webpack.common";

module.exports = () => {
    return merge(
        getCommonConfig(),
        {
            mode: 'none',
            devtool: 'eval-cheap-module-source-map',
        },
        modules.loadDevCss(),
    )
}
