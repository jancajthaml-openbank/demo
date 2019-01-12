import React from 'react'

import PropTypes from 'prop-types'

import { Tokens } from '../containers/Fio'

class Index extends React.Component {

  render() {
    return (
      <div>
        <pre>
          I am a react component running in {PRODUCTION ? 'production' : 'development'}
        </pre>
        <Tokens />
      </div>
    )
  }
}

export default Index
