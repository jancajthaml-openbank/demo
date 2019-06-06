import React from 'react'

import PropTypes from 'prop-types'

// https://react-select.com/home

class Select extends React.Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    valueChanged: PropTypes.func.isRequired,
  }

  static defaultProps = {
    valueChanged: (item) => {}
  }

  state = {
    options: [],
    selected: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled) {
      return null
    }

    if (
      nextProps.options.length != prevState.options.length ||
      !nextProps.options.every((this_i,i) => this_i == prevState.options[i] )
    ) {
      return {
        options: nextProps.options,
        selected: nextProps.options[0],
      }
    }

    return null
  }

  componentDidMount() {
    if (this.state.selected) {
      this.props.valueChanged(this.state.selected)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      this.props.valueChanged(this.state.selected)
    }
  }

  onChange = (event) => {
    this.setState({ selected: event.target.value })
  }

  render() {
    const { options, selected, disabled } = this.state

    if (disabled || !selected) {
      return (
        <select disabled>
          <option>–––</option>
        </select>
      )
    }

    return (
      <select
        value={selected}
        onChange={this.onChange}
      >
        {options.map((item) =>
          <option key={item} value={item}>{item}</option>
        )}
      </select>
    )
  }
}

export default Select
