import React from 'react'

import { CardStyled } from './styles'

class Card extends React.Component {

  render() {
    return (
      <CardStyled>
        {this.props.children}
      </CardStyled>
    )
  }
}

export default Card
