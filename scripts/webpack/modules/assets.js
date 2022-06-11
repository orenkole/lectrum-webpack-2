import HtmlWebpackPlugin from "html-webpack-plugin";

export const setupHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: "./static/template.html",
            title: "Lear webpack",
            favicon: "./static/favicon.ico"
        }),
    ]
})


export const loadSvg = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                issuer:  /\.js$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                issuer: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
})
