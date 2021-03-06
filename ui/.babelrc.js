const plugins = [

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
  [
    'styled-components', {
      ssr: true,
      displayName: true,
      preprocess: false,
    },
  ],
  'transform-undefined-to-void',
]

module.exports = {

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

  plugins,

  env: {
    development: {
      plugins: [
        ...plugins
      ]
    },
    production: {
      plugins: [
        ...plugins,
        [
          'transform-react-remove-prop-types', {
            mode: 'wrap',
          },
        ],
      ],
    },
    test: {
      plugins: [
        ...plugins,
        'babel-plugin-transform-es2015-modules-commonjs',
      ],
    },
  },

}
