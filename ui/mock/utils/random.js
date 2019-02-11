
function randomId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 20)
}

module.exports = Object.freeze({
  randomId,
})
