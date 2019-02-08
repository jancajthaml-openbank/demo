import React from 'react'

class ErrorBoundary extends React.Component {
  static propTypes = {}

  state = {
    hasError: false,
    error: null,
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error,
    })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (!hasError) {
      return children
    }

    return 'Fatal error'
  }
}

export default ErrorBoundary
