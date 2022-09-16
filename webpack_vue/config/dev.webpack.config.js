const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/index.js'),
    test: path.join(__dirname, '../src/test.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    // webpackDevServer开启热更新后，不能使用chunkhash、contenthash
    filename: NODE_ENV === 'development' ? 'js/[name].bundle.[hash:8].js' : 'js/[name].bundle.[contenthash:8].js',
    // 打包后的内容，所在的公共路径。访问需要通过 publicPath + path
    // publicPath: '/test'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  // webpack-dev-server配置
  devServer: {
    port: 8000,
    // 可以通过localhost访问
    host: '127.0.0.1',
    overlay: {
      errors: true
    },
    hot: true
  },
  plugins: [
    // vue-loader插件，允许用.vue单文件写vue
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: 'webpack vue',
      // minify: {
      //   // 压缩 HTML 文件
      //   removeComments: true, // 移除 HTML 中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true // 压缩内联 css
      // },
      filename: '../dist/views/index.html', // 生成后的文件名
      template: path.resolve(__dirname, '../public/index.html'), // 根据此模版生成 HTML 文件
      // chunks: ['main'] // entry中的 main 入口才会被打包
      // 内存打包后，生成的JS、CSS、图片等静态资源所在公共路径，所以最终静态资源路径为：output.publicPath + output.path + publicPath + name
      // publicPath: '/test'
    }),
    // 热更新。和webpack-dev-server的hot配置项，配置一个即可
    // new webpack.HotModuleReplacementPlugin(),
    // 这个要放最后
    new CleanWebpackPlugin()
  ]
};
