import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SearchZone from './SearchZone'
import {If} from './If'

class SearchForm extends React.Component {
  constructor() {
    super()
    this.state={
      users: [],
      searchParams: {name: '', skill: ''},
    }
  }

  handleChange(key_value) {
    this.setState({searchParams: {...this.state.searchParams, ...key_value}})
  }

  render() {
    const url = Routes.masters_search_path(this.state.searchParams)
    return (
       <div>
         <SearchZone {...this.state} handleChange={this.handleChange.bind(this)}/>
         <a href={url} className='p_button blue reverse'>検索</a>
       </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SearchForm />,
    document.getElementById("SearchForm"),
  )
})
