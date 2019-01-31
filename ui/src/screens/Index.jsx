import React from 'react'

import PropTypes from 'prop-types'

import { Tokens as FioTokens } from '../containers/Fio'
import { Tokens as BondsterTokens } from '../containers/Bondster'

class Index extends React.Component {

  render() {
    return (
      <div>
        <pre>
          I am a react component running in {PRODUCTION ? 'production' : 'development'}
        </pre>
        <FioTokens />
        <BondsterTokens />
      </div>
    )
  }
}

export default Index
