const path = require('path')
const fs = require('fs')

const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SafePostCssParser = require('postcss-safe-parser')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function getPlugins(production) {
  let plugins = [
    new webpack.DefinePlugin({
      PRODUCTION: `${production}`,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment\/src\/lib\/locale/),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: false,
      dry: false,
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
    }]),
    new HtmlWebpackPlugin({
      template: (() => {
        try {
          const appIndex = path.resolve(__dirname, 'public', 'index.html')
          if (fs.statSync(appIndex).isFile()) {
            return appIndex
          }
          return null
        } catch (e) {
          return null
        }
      })(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: production,
        minifyCSS: production,
        minifyURLs: production,
      },
      inject: 'body',
    }),
  ]

  if (production) {
    plugins.push(...[
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: SafePostCssParser,
          map: false,
        },
      })
    ])
  } else {
    plugins.push(...[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ])
  }

  return plugins
}

module.exports = function(env, argv) {
  const production = process.env.NODE_ENV === 'production'

  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode: production ? 'production' : 'development',
    stats: production ? 'normal' : 'minimal',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'static/js/[name].[hash:5].js',
      chunkFilename: 'static/js/[name].[hash:5].chunk.js',
      pathinfo: !production,
    },
    module: {
      strictExportPresence: true,
      noParse: [
        /sinon|bindings/,
      ],
    },
    resolve: {
      unsafeCache: true,
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
      extensions: [
        '.js',
        '.jsx',
        '.sass',
        '.scss',
        '.css',
        '.json',
        '.react.js',
        '.web.js',
        '.web.jsx',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
      plugins: [
        PnpWebpackPlugin
      ],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    target: 'web',
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
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
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: [
                      'last 2 versions',
                    ],
                  },
                  modules: false,
                  shippedProposals: true,
                },
              ],

              '@babel/preset-react',
            ],

            plugins: [

              // Stage 0
              '@babel/plugin-proposal-function-bind',

              // Stage 1
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              [
                '@babel/plugin-proposal-optional-chaining',
                {
                  loose: false,
                },
              ],
              [
                '@babel/plugin-proposal-pipeline-operator',
                {
                  proposal: 'minimal',
                },
              ],
              [
                '@babel/plugin-proposal-nullish-coalescing-operator',
                {
                  loose: false,
                },
              ],
              '@babel/plugin-proposal-do-expressions',

              // Stage 2
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              '@babel/plugin-proposal-function-sent',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-throw-expressions',

              // Stage 3
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: false,
                },
              ],
              '@babel/plugin-proposal-json-strings',

              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true
                },
              ],

              'react-hot-loader/babel',
              'transform-undefined-to-void',
            ],

            env: {
              production: {
                plugins: [
                  [
                    'transform-react-remove-prop-types', {
                      mode: 'wrap',
                    },
                  ],
                ],
              },
              test: {
                plugins: [
                  'babel-plugin-transform-es2015-modules-commonjs',
                ],
              },
            },

            ignore: [
              'build',
            ],

            cacheDirectory: !production,
            sourceMaps: !production,
          },
        },
      }, {
        test: /\.html$/,
        loader: 'handlebars-loader'
      }, {
        test: /\.(sass|scss)/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            map: false,
            plugins: () => [
              flexbugsFixes,
              autoprefixer,
            ],
          },
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            map: false,
            plugins: () => [
              flexbugsFixes,
              autoprefixer,
            ],
          },
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
      maxEntrypointSize: 1048576, // 1 MB
      maxAssetSize: 1048576,      // 1 MB
    } : false,
    plugins: getPlugins(production),
    optimization: {
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      providedExports: true,
      namedModules: true,
      namedChunks: true,
      flagIncludedChunks: true,
      occurrenceOrder: true,
      usedExports: true,
      sideEffects: true,
      noEmitOnErrors: true,
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
          cache: true,
          sourceMap: !production,
        }),
      ] : [],
      splitChunks: {
        chunks: 'async',
        minSize: 1000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: false,
          vendors: false,
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
      clientLogLevel: 'none',
      publicPath: '/',
      host: '0.0.0.0',
      port: 80,
      hot: true,
      inline: true,
      watchContentBase: true,
      https: false,
      quiet: false,
      noInfo: false,
      contentBase: path.resolve(__dirname, 'build'),
      historyApiFallback: {
        index: '/',
        disableDotRule: true,
      },
      overlay: {
        errors: true,
        warnings: true,
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
    devtool: production ? false : 'inline-source-map',
  }
}
