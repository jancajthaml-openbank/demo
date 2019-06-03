const fs = require('fs')
const path = require('path')

let template

async function loadTemplate() {
  await new Promise((resolve, reject) => {
    try {
      fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, data) => {
        const [ up, scripts ] = data.split('</body>')[0].split('<div id="mount"/>')
        const [ preStyle, body ] = up.split('</style>')
        const [ html, stylesheet ] = preStyle.split('<style type="text/css">')

        template = {
          html,
          stylesheet,
          body,
          scripts,
        }
        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = async function(initialState = {}, styles="", content = "") {
  if (!template) {
    await loadTemplate()
  }

  let resp = template.html
  resp += '<style type="text/css">'
  resp += `${template.stylesheet}${styles}`
  resp += '</style>'
  resp += template.body
  resp += `<div id="mount"/>${content}</div>`
  if (Object.keys(initialState).length > 0) {
    resp += `<div id="__STATE__" style="display: none;">${JSON.stringify(initialState)}</div>`
  }
  resp += template.scripts
  resp += '</body></html>'

  return resp
}
