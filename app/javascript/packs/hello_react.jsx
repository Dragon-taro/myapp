import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ImgDnDzone from './ImgDnDzone'

class DemoZone extends React.Component {
  constructor() {
    super();
    this.state={picture: ''}
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
        this.setState({picture: data.image_url}, () => {
          $("html,body").animate({scrollTop:$('#jsResult').offset().top});
        })
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    });
  }

  render() {
    return(
      <div className="imageDropzone">
        <ImgDnDzone onDrop={this.onDrop.bind(this)} />
        {
          (() => {
              if (this.state.picture) {
                return(
                  <section>
                    <h2 id="jsResult">Result</h2>
                    <ul className="resultIinner">
                      <li>
                        <h3>Before</h3>
                          <img src={this.state.picture} />
                      </li>
                      <li>
                        <h3>After</h3>
                          <img src={this.state.picture} />
                      </li>
                    </ul>
                  </section>
                )
              }
            })()
        }
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <h2>Demonstration</h2>
      <p>下の園の中にドラッグ＆ドロップするとその写真を元にしたヒョウ柄の写真が生成されます。</p>
      <DemoZone name="React" />
    </div>,
    document.getElementById("dropzone"),
  )
})
