/* eslint-disable */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  // 需要打包的文件配置
  entry: {
    app: './app/src/app.js', //通过key value的形式配置了需要打包的文件
  },

  // 输出文件配置
  output: {
    path: './app/dist', // 输出的目录，我们是配置为当前目录下的dist目录
    publicPath: 'dist/', // 发布后的服务器或cdn上的路径, 配置这个后webpack-dev-server会自动将html中引用的部署路径自动路由到本地的开发路径上
    filename: '[name].bundle.js', // 输出的文件名，[name]就是entry的key
  },

  // 模块加载器
  module: {
    loaders: [ // 加载器数组
      {
        test: /\.(png|jpg|jpeg|gif|ttf|eot|woff|woff2|svg)$/, // 用来匹配文件的正则
        // 加载器的名称，此处为url-loader,`?`后面可以添加loader的参数，
        // 具体得参考loader的github主页。
        loader: 'url?limit=10000',
      }, {
        test: /\.(css|scss)$/,
        // 使用ExtractTextPlugin,将样式抽出到单独的文件中，
        // webpack默认是构建html的style标签; 多个loader可以通过!连接起来，
        // 相当于管道一样，最后面的loader先传入文件，然后再传出给前面的loader
        loader: ExtractTextPlugin.extract('style',
                  'css!postcss-loader!sass-loader'),
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // loader也可以使用使用数组进行配置, loaders:[{loader: ..., query:...},]
        query: { // loader的参数也可以通过querty传递
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime', 'transform-flow-strip-types'],
        },
      },
    ],
  },
   // postcss-loader 的配置，这里我们主要是使用autoprefixer
  postcss: [autoprefixer({ browsers: ['last 2 version', 'Explorer >= 9'] })],

  // webpack 插件配置
  plugins: [
    // 抽取样式到单独的 文件中，文件名称则为[name].css
    new ExtractTextPlugin('[name].css'),
    // 定义变量,这些变量会在build的时候执行，可以给不同的命令传入不同的env，
    // 这样就能实现服务端与本地的配置不同了。
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],

  // webpack-dev-server配置
  // http://webpack.github.io/docs/webpack-dev-server.html#api
  devServer: {
    contentBase: './app',
  },

}
