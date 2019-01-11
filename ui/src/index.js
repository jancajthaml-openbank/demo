document.write("SADADSADS, fsssssxssxxxss")

if (PRODUCTION) {
  document.write("<div>running production</div>")
} else {
  document.write("<div>running dev mode</div>")
}

if (PRODUCTION) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      const prefix = location.pathname.replace(/\/(index\.html)?$/, '')
      navigator.serviceWorker.register(`${prefix}/cache.sw.js`)
        .then(function(registration) {
          console.log('[success] scope: ', registration.scope)
        }, function(err) {
          console.log('[fail]: ', err)
        })
    })
  }
}
