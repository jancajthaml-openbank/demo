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
    const { hasError, error } = this.state
    const { children } = this.props

    if (!hasError) {
      return children
    }

    console.log(error)

    // FIXME button to remount instead of reload

    // FIXME pretty display fatal error message
    return 'Fatal error'
  }
}

export default ErrorBoundary
