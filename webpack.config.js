const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setUpDevtool() {
    if(IS_DEV ) {
        return 'eval';
    }
    if(IS_PROD) {
        return false;
    }
}

module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: [
        path.resolve(__dirname, './src/js/index.js')
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: '',
    },
    devServer : {
        port: process.env.PORT || 4200,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',  
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|TTF|OTF|eot|)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                    'css-loader',
                    { 
                    loader: 'postcss-loader',
                    options: { sourceMap: true, 
                        postcssOptions: {
                            config: path.resolve(__dirname, "./postcss.config.js"),
                        },
                    }
                  }, 
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
              patterns: [
                    { from: './src/img', to:'img' }
              ]
          }),
    ],
    devtool: setUpDevtool()
}