import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import EditZone from './EditZone'
import SkillEditZone from './SkillEditZone'


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
      data     : {user: {...this.state.user, skills_attributes: this.state.skills}},
      success: (data) => {
        this.setState(data)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  handleSkillChange(key_value, id) {
    const skills = this.state.skills.map(skill => {
      if (skill.id == id) {
        return _.merge(skill, key_value)
      }
      return skill
    })
    this.setState(skills: skills)
  }

  addSkill() {
    this.setState({skills: this.state.skills.concat({language: '', description: ''})}, () => {
      this.handleSave()
    })
  }

  render() {
    const skillNode = this.state.skills ? this.state.skills.map(skill => {
      return (
        <li key={skill.id}>
          <SkillEditZone
            {...this.state}
            {...skill}
            handleSave={this.handleSave.bind(this)}
            onChange={this.handleSkillChange.bind(this)}
          />
        </li>
      )
    }) : null

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

          <li>
            <div>
              スキル
            </div>
            <div>
              <ul>
                {skillNode}
              </ul>
              <button onClick={this.addSkill.bind(this)}>スキルを追加</button>
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
