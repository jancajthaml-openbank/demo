import React from 'react'
import { Wrapper } from './styles'
import { Logo } from 'components/Logo'

const SplashScreen = () => {
  return (
    <Wrapper>
      <div>
        <Logo />
        <div>
          initializing...
        </div>
      </div>
    </Wrapper>
  )
}

export default SplashScreen
