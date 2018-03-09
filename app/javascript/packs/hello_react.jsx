import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ImgDnDzone from './ImgDnDzone'

function ImageToBase64(img, mime_type) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
}

//=====================================================
// 使い方
//=====================================================


class DemoZone extends React.Component {
  constructor() {
    super();
    this.state={
      image_url: '',
      is_load: false,
      is_dropped: false,
      is_result_load: false,
    }
  }

  componentDidMount() {
    
  }

  onDrop(params) {
    this.setState({is_result_load: true}, () => {
      setTimeout(() => {
        this.setState({is_dropped: true, is_result_load: true}, 6232)
      })
    })
  }

  onClick() {
    const img = document.getElementById('convertedImg');
    const b64 = ImageToBase64(img, "image/jpeg")
    const data = {
      'api_key': 'e2ded4d85646bcd10e6b84d34a0fd5fa',
      'base64_image': b64,
      'item_code': 'RNA1',
      'colour': 'White'
    }
    const self = this
    this.setState({is_load: true})

    $.ajax({
        url: "https://rapanuiclothing.com/api-access-point/",
        type: "POST",
        dataType: "text",
        data: data,
        timeout: 30000,
        success: function(response) {
          self.setState({buy_url: response, is_load: false})
        },
        error: function(x, t, m) {
            if(t==="timeout") {
                alert("Sorry, the request timed out.");
            } else {
                alert(m);
            }
        }
    });

  }

  render() {
    return(
      <div className="imageDropzone">
        <ImgDnDzone onDrop={this.onDrop.bind(this)} />
          {(() => {
            if (this.state.is_result_load) {
              return <div className="button"><div id="loader"></div></div>
            }
          })()}
        {
          (() => {
              if (this.state.is_dropped) {
                return(
                  <section>
                    <h2 id="jsResult">Result</h2>
                    <ul className="resultIinner">
                      <li>
                        <h3>Before</h3>
                          <img src={this.state.image_url} />
                      </li>
                      <li>
                        <h3>After</h3>
                          <img id='convertedImg' src={this.state.image_url} />
                      </li>
                    </ul>
                    <div className="shirtsZone">
                      <p>オリジナルのヒョウ柄Tシャツを作りませんか？</p>
                      <div className="shirts">
                        <img className="shirts_img" src={this.state.shirts_url} />
                        <img className="hyo" src={this.state.image_url} />
                        <span>Leoparadise</span>
                      </div>
                      <div className="buttonWrapper">
                        {(() => {
                          if (this.state.buy_url) {
                            return <div className="button"><a href={this.state.buy_url}>購入する</a></div>
                          } else {
                            if (this.state.is_load) {
                              return <div className="button"><div id="loader"></div></div>
                            } else {
                              return <div className="button" onClick={this.onClick.bind(this)}>ほしい！</div>
                            }
                          }
                        })()}
                      </div>
                    </div>
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
