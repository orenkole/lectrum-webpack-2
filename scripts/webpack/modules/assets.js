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
