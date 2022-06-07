const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
    return {
        mode: 'none',
        devtool: false,
        plugins: [
            new HtmlWebpackPlugin({
                template: "./static/template.html",
                title: "Lear webpack",
                favicon: "./static/favicon.ico"
            })
        ]
    }
}
