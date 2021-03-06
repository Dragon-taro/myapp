import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {If} from './If'


class SearchZone extends React.Component {
  constructor() {
    super()
  }

  handleChange(e) {
    const key_value = {[e.target.name]: e.target.value}
    this.props.handleChange(key_value)
  }

  render() {
    return (
      <div className='m_serachForm'>
        <div>
          <p>名前</p>
          <input type='text' value={this.props.searchParams.name || ''} name='name' onChange={this.handleChange.bind(this)}/>
        </div>
        <div>
          <p>スキル</p>
          <input type='text' value={this.props.searchParams.skill || ''} name='skill' onChange={this.handleChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default SearchZone
