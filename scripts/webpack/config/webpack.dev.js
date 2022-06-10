const {merge} = require('webpack-merge')
const getCommonConfig = require("./webpack.common")

module.exports = () => {
    return merge(
        getCommonConfig(),
        {
            mode: 'none',
            // TODO: setup source maps
            devtool: false,
            module: {
                rules: [
                    // TODO: fix styles
                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                    }
                ]
            },
            plugins: [
            ]
        }
    )
}
