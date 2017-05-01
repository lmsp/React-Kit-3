const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDebug = !process.argv.includes('-p')

// Desarrollo
const webpackDevServerPort = 8080
const browserSyncProxyPort = 3000
const publicPathDev = '/'

// Productivo
const publicPathProd = '/'

let config = {
  plugins: [
    new HappyPack({
      id: 'images',
      cache: true,
      loaders: [
        {
          loader: 'url-loader'
        }
      ],
      threads: 4
    }),
    new HappyPack({
      id: 'jsx',
      cache: true,
      loaders: [
        {
          loader: 'react-hot-loader!babel-loader'
        },
        {
          loader: 'eslint-loader'
        }
      ],
      threads: 4
    }),
    new HtmlWebpackPlugin({
      template: './dist/index.template.html',
      inject: true
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: 'happypack/loader?id=images'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: isDebug
          ? 'happypack/loader?id=cssdebug'
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'happypack/loader?id=cssrelease'
          })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: isDebug ? publicPathDev : publicPathProd,
    filename: isDebug ? 'bundle.js' : 'bundle.[hash].js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: isDebug ? 'source-map' : false
}

if (isDebug) {
  config.entry = [
    'webpack-dev-server/client?http://localhost:' + webpackDevServerPort,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ]
  config.plugins.push(
    new BrowserSyncPlugin(
      {
        port: browserSyncProxyPort,
        proxy: 'localhost:' + webpackDevServerPort
      },
      // opciones
      {
        // Previene a BrowserSync recargar la página
        // y deja a Webpack Dev Server que tome el control
        reload: false
      }
    )
  )
  config.plugins.push(
    new HappyPack({
      id: 'cssdebug',
      cache: true,
      loaders: [
        {
          loader: 'style-loader?sourceMap'
        },
        {
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        },
        {
          loader: 'postcss-loader?sourceMap=inline'
        }
      ],
      threads: 4
    })
  )
  config.module.rules.push({
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre'
  })
} else {
  config.entry = './src/index.js'
  config.plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      exclude: ['index.template.html', 'bundle.js', 'bundle.js.map']
    })
  )
  config.plugins.push(
    new HappyPack({
      id: 'cssrelease',
      cache: true,
      loaders: [
        {
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        },
        {
          loader: 'postcss-loader'
        }
      ],
      threads: 4
    })
  )
  config.plugins.push(
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  )
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
