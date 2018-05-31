import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {If} from './If'


class SearchUser extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const url = document.location.pathname
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'GET',
      success: (data) => {
        this.setState(data)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  render() {
    const masterNode = null
    return (
       <div>
         <ul>
           {masterNode}
         </ul>
       </div>
    )
  }
}

export default SearchUser
