const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    plugins: [new CleanWebpackPlugin()],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: false,
                        },
                    },
                ],
            },
        ],
    },
}
