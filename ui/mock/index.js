const app = require('./server')()

async function boot() {
  await new Promise((resolve, reject) => {
    app.listen(4000, '0.0.0.0', (err) => err ? reject(err) : resolve())
  })

  console.log('Mock is ready on :4000')
}

boot()
