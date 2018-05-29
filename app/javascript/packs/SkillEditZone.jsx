import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {If} from './If'


class SkillEditZone extends React.Component {
  constructor() {
    super()
    this.state={
      isEditMode: false,
    }
  }

  editMode() {
    this.setState({isEditMode: true})
  }

  handleChange(e) {
    const key_value = {[e.target.name]: e.target.value}
    this.props.onChange(key_value, this.props.id)
  }

  handleSave() {
    this.setState({isEditMode: false})
    this.props.handleSave()
  }

  render() {
    return (
      <div>
        <If condition={!this.state.isEditMode} >
          <div>
            <span>{this.props.language}</span>
            <span>{this.props.description}</span>
            <If condition={this.props.is_current_user}>
              <button onClick={this.editMode.bind(this)}>編集</button>
            </If>
          </div>
        </If>
        <If condition={this.state.isEditMode}>
          <div>
            <input type='text' name='language' value={this.props.language} onChange={this.handleChange.bind(this)}/>
            <textarea name='description' value={this.props.description} onChange={this.handleChange.bind(this)}></textarea>
            <button onClick={this.handleSave.bind(this)}>保存</button>
          </div>
        </If>
      </div>
    )
  }
}

export default SkillEditZone
