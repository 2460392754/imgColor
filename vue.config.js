const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    productionSourceMap: false,

    parallel: require('os').cpus().length > 1,

    // configureWebpack: () => {
    //     if (process.env.Node_ENV === 'production') {
    //         return {
    //             plugins: [
    //                 new CompressionWebpackPlugin({
    //                     test: /\.js$|\.html$|\.css/,
    //                     threshold: 1024,
    //                     deleteOriginalAssets: false
    //                 })
    //             ]
    //         }
    //     }
    // },
}