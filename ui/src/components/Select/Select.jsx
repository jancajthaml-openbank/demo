import React from 'react'

import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader/root'

class Select extends React.Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    valueChanged: PropTypes.func.isRequired,
  }

  defaultProps = {
    valueChanged: (item) => {}
  }

  state = {
    options: [],
    selected: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.props.valueChanged(this.state.selected)
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
    const { options, selected } = this.state

    return (
      <select value={selected} onChange={this.onChange}>
        {options.map((item) =>
          <option key={item} value={item}>{item}</option>
        )}
      </select>
    )
  }
}

export default PRODUCTION ? Select : hot(Select)
