const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const isDev = process.env.NODE_ENV === 'deveplopment'

const config = {
  target: 'web',
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // css-loader打包好的css代码以<style>标签的形式插入到html文件中
          'css-loader' // css-loader 是处理css文件中的url()等
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)/,
        use: [
          {
            loader: 'url-loader',//把图片直接转成base64 而不是文件  依赖file-loader
            options: {
              limit: 1024,//<1024
              name: '[name]-aaa.[ext]'
            }
          }

        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'//向上扔  这个就已经生成sourceMap
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({//js里面可以用到
      'process.env': {
        NODE_ENV: isDev? '"development"' : '"prouction"'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
  ]
}
if(isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
    errors: true
    },
    hot: true
    //open: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}
module.exports = config