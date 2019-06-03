const fs = require('fs')
const path = require('path')

let template

async function loadTemplate() {
  await new Promise((resolve, reject) => {
    try {
      fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, data) => {
        const [ up, scripts ] = data.split('</body>')[0].split('<div id="mount"/>')

        template = {
          lead: up,
          scripts: scripts,
        }
        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = async function(initialState = {}, content = "") {
  if (!template) {
    await loadTemplate()
  }

  let resp = template.lead

  resp += `<div id="mount"/>${content}</div>`

  if (Object.keys(initialState).length > 0) {
    resp += `<div id="__STATE__" style="display: none;">${JSON.stringify(initialState)}</div>`
  }

  resp += template.scripts
  resp += '</body></html>'

  return resp
}
