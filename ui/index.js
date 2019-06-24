const path = require('path')
const url = require('url')
const express = require('express')
const [ https, http ] = [ require('https'), require('http') ]

const app = express()
app.use('/static', express.static(path.resolve(__dirname, 'build/static')))
app.use(express.json())
app.disable('x-powered-by')

const template = require('./src/template')

const babelRc = require('./.babelrc')

require('@babel/register')( {
  presets: [
    "@babel/env",
    "@babel/preset-react",
  ],
  plugins: babelRc.plugins,
} )

const ssr = require('./src/server')

/* -------------------------------------------------------------------------- */

const RETRIABLE_NETWORK_ERRORS = [
  'ECONNRESET',
  'ENOTFOUND',
  'ESOCKETTIMEDOUT',
  'ETIMEDOUT',
  'ECONNREFUSED',
  'EHOSTUNREACH',
  'EPIPE',
  'EAI_AGAIN',
]

const eventuallyFetchJSON = (vector, options) => new Promise((resolve, reject) => {
  const { body, ...rest } = options
  const payload = JSON.stringify(body)
  const req = vector.request({
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': payload === '{}' ? 0 : payload.length,
    }
  }, (resp) => {
    let body = ''
    resp.on('data', (chunk) => {
      body += chunk.toString('utf8')
    })

    resp.on('end', () => {
      try {
        body = JSON.parse(body)
      } catch(err) {
        reject(err)
      }
      resolve([resp.statusCode, body])
    })
  })

  req.on('error', reject)
  if (payload !== '{}') {
    req.write(payload)
  }
  req.end()
}).catch((err) => (RETRIABLE_NETWORK_ERRORS.indexOf(err.code) !== -1)
  ? eventuallyFetchJSON(vector, options)
  : Promise.reject(err)
).then(([code, body]) => (code === 503 || code === 504)
  ? eventuallyFetchJSON(vector, options)
  : Promise.resolve([code, body])
)

async function FetchJSON(method, uri, body = {}) {
  const { protocol, hostname, port, pathname } = url.parse(uri)
  const secure = protocol.startsWith('https')
  const options = secure
    ? {
      host: hostname,
      port,
      path: pathname,
      method: method,
      body: body,
      rejectUnauthorized: false,
      requestCert: false,
      agent: null,
      ecdhCurve: 'auto',
    }
    : {
      host: hostname,
      port,
      path: pathname,
      method: method,
      body: body,
      agent: null,
    }

  return await eventuallyFetchJSON(secure ? https : http, options)
}

/* -------------------------------------------------------------------------- */

const proxyPass = async (target, req, res) => {
  try {
    const uri = `${target}/${req.url.split('/').slice(3).join('/')}`
    const [ code, resp ] = await FetchJSON(req.method, uri, req.body)
    return res.status(code).json(resp)
  } catch(err) {
    console.log(err)
    return res.status(500).json({})
  }
}

app.all('/api/vault/*', (req, res) =>
  proxyPass('https://server-production:4400', req, res)
)

app.all('/api/ledger/*', (req, res) =>
  proxyPass('https://server-production:4401', req, res)
)

app.all('/api/bondster/*', (req, res) =>
  proxyPass('https://server-production:4001', req, res)
)

app.all('/api/fio/*', (req, res) =>
  proxyPass('https://server-production:4002', req, res)
)

app.all('/api/search/*', (req, res) =>
  proxyPass('http://server-production:8080', req, res)
)

app.get('/*', async (req, res) => {
  if (req.url.startsWith('/favicon')) {
    return res.status(404).json({})
  } else if (req.url.startsWith('/api')) {
    return res.status(404).json({})
  }

  let initialState = {}
  const [ code, tenants ] = await FetchJSON('GET', 'https://server-production:4400/tenant')
  if (code === 200) {
    initialState = {
      ...initialState,
      tenant: {
        tenants,
        tenant: tenants[0],
        loading: false,
      }
    }
  }

  const [ content, styles, preloadedState ] = await ssr(req, initialState)
  const response = await template(preloadedState, styles, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
})


/* -------------------------------------------------------------------------- */

app.listen(3000)
