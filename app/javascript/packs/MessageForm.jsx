import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchZone from './SearchZone'
import {If} from './If'

class MessageForm extends React.Component {
  constructor() {
    super()
    this.state={
      value: ''
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit() {
    this.props.handleSubmit({this.state})
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.value} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>送信</button>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MessageForm />,
    document.getElementById("MessageForm"),
  )
})
