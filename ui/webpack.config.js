const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const SafePostCssParser = require('postcss-safe-parser')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const babelRc = require('./.babelrc')

function getPlugins(production) {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': production ? `"production"` : `"development"`,
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
      dangerouslyAllowCleanPatternsOutsideProject: false,
      cleanStaleWebpackAssets: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: false,
        removeStyleLinkTypeAttributes: false,
        keepClosingSlash: true,
        minifyJS: production,
        minifyCSS: production,
        minifyURLs: production,
      },
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: production ? 'static/media/css/[name].[contenthash:8].css' : 'static/media/css/[name].css',
      chunkFilename: production ? 'static/media/css/[id].[contenthash:8].css' : 'static/media/css/[id].css',
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ]
  return plugins
}

module.exports = function(env = {}, args = {}) {
  const production = process.env.NODE_ENV === 'production'

  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode: production ? 'production' : 'development',
    stats: production ? 'normal' : 'errors-only',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: production ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      pathinfo: !production,
    },
    module: {
      strictExportPresence: true,
    },
    resolve: {
      unsafeCache: false,
      modules: [
        'node_modules',
        'src',
      ],
      extensions: [
        '.js',
        '.jsx',
        '.css',
        '.json',
        '.react.js',
        '.web.js',
        '.web.jsx',
      ],
      mainFields: [
        'browser',
        'main',
      ],
    },
    target: 'web',
    cache: !production,
    module: {
      rules: [{
        parser: {
          requireEnsure: false,
        }
      }, {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            ...babelRc,
            ignore: [
              'build',
            ],
            cacheDirectory: !production,
            sourceMaps: !production,
          },
        }],
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'handlebars-loader',
          }
        ]
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{
          loader: production ? MiniCssExtractPlugin.loader : 'style-loader',
        },{
          loader: 'css-loader',
        }],
      }, {
        test: /\.(eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/images/[name].[hash:8].[ext]',
          },
        }
      }, {
        test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/fonts/[name].[hash:8].[ext]',
          },
        }
      }, {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      }],
    },
    performance: production ? {
      hints: false,
      maxEntrypointSize: 1048576,
      maxAssetSize: 1048576,
    } : false,
    plugins: getPlugins(production),
    optimization: {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      providedExports: true,
      flagIncludedChunks: true,
      chunkIds: 'named',
      moduleIds: 'named',
      usedExports: true,
      sideEffects: true,
      emitOnErrors: true,
      concatenateModules: !production,
      minimizer: production ? [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
        }),
      ] : [],
      splitChunks: {
        chunks: 'async',
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          default: false,
          defaultVendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
        }
      },
      runtimeChunk: true
    },
    devServer: production ? undefined : {
      compress: false,
      disableHostCheck: true,
      clientLogLevel: 'debug',
      publicPath: '/',
      host: '0.0.0.0',
      port: 3000,
      hot: false,
      inline: true,
      watchContentBase: true,
      https: false,
      quiet: false,
      noInfo: false,
      contentBase: path.resolve(__dirname, 'build'),
      historyApiFallback: {
        index: '/',
        disableDotRule: true,
        logger: console.log.bind(console),
      },
      overlay: {
        errors: true,
        warnings: true,
      },
      proxy: {
        '/api/': 'http://server-mock:4000',
      }
    },
    devtool: production ? false : 'source-map',
  }
}
