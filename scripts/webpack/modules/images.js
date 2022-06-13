export const loadImages = () => ({
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:5].[ext]'
                        }
                    },
                ],
            },
        ]
    }
})
