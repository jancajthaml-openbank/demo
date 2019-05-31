const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')

let template

async function loadTemplate() {
  await new Promise((resolve, reject) => {
    try {
      fs.readFile(path.resolve(__dirname, '../build/index.html'), (err, data) => {
        template = data
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

  const resp = parse(template)
  resp.querySelector('#mount').appendChild(content)
  if (Object.keys(initialState).length > 0) {
    resp.querySelector('body').appendChild(`<div id="__STATE__" style="display: none;">${JSON.stringify(initialState)}</div>`)
  }

  return resp.toString()
}
