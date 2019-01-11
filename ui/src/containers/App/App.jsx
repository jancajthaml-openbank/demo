import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div>
        I am a react component running in {PRODUCTION? 'production' : 'development'}
      </div>
    )
  }
}

export default App
