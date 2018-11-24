const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: "./public",
        port: 9000
    },
    optimization:{
        minimizer:[
            new UglifyjsWebpackPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "estilo.css"
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,//resoinsavel por separar o CSS
                //'style-loader',//responsavel por adicionar a tag <style> dentro da DOM (remocer pois da conflito com o MiniCssExtractPlugin)
                'css-loader',//responsavel por interpretar as urls e links dentro da css(@import, url)
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use:['file-loader']
        }
    ]
    }
}