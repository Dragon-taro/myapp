import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ImgDnDzone from './ImgDnDzone'

class GetData extends React.Component {
  constructor() {
    super();
    this.state={picture: ''}
  }

  componentDidMount() {
    const url = "https://bitflyer.jp/api/echo/price"
    fetch(url).then(res => console.log(res)).catch(error => console.error(error))
  }

  onDrop(params) {
    const url = "/pictures"
    const form_data = new FormData()
    form_data.append('image', params.file)
    $.ajax({
      url      : url,
      data     : form_data,
      dataType : 'json',
      type     : 'POST',
      processData : false,
      contentType : false,
      success: (data) => {
        this.setState({picture: data.image_url})
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    });
  }

  render() {
    return(
      <div>
        <ImgDnDzone onDrop={this.onDrop.bind(this)} />
        <img src={this.state.picture} />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GetData name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
