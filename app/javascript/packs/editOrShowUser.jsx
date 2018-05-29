import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EditZone from './EditZone'


class EditOrShowUser extends React.Component {
  constructor() {
    super()
    this.state={
      user: {},
    }
  }

  componentDidMount() {
    const url = Routes.user_path(gon.user_id)
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

  editMode() {
    this.setState({isEditMode: true})
  }

  handleChange(key_value) {
    this.setState({user: {...this.state.user, ...key_value}})
  }

  handleSave() {
    const url = Routes.user_path(gon.user_id)
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'PUT',
      data     : {user: this.state.user},
      success: (data) => {
        this.setState(data)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.user.image} />
        <h2>
          <EditZone {...this.state} name='name' value={this.state.user.name} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='text'/>
        </h2>

        <ul>
          <li>
            <div>
              自己紹介
            </div>
            <div>
              <EditZone {...this.state} name='description' value={this.state.user.description} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='textarea'/>
            </div>
          </li>

          <li>
            <div>
              目標
            </div>
            <div>
              <EditZone {...this.state} name='goal' value={this.state.user.goal} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='textarea'/>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditOrShowUser />,
    document.getElementById("editOrShowUser"),
  )
})
