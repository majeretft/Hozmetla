const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/obj3d', to: 'obj3d' },
                { from: './src/files', to: 'files' },
            ],
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    performance: { hints: false },
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
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                    {
                                        tag: 'link',
                                        attribute: 'href',
                                        type: 'src',
                                    },
                                ],
                                urlFilter: (attribute, value, resourcePath) => {
                                    // The `attribute` argument contains a name of the HTML attribute.
                                    // The `value` argument contains a value of the HTML attribute.
                                    // The `resourcePath` argument contains a path to the loaded HTML file.

                                    if (
                                        /index/.test(value) ||
                                        /product/.test(value)
                                    ) {
                                        return false
                                    }

                                    return true
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|ico|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            outputPath: 'css',
                        },
                    },
                    'extract-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'css',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
}
