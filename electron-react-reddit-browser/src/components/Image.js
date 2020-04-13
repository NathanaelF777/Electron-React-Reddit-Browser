import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      permalink: '',
      op: {},
      opImg: false,
      comments: []
    }
    this.getComments = this.getComments.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async getComments(link){
    try {
      let response = await fetch(`https://www.reddit.com${link}.json?raw_json=1`)
      let data = await response.json()
      console.log(data);
      this.setState({
        op: data[0].data.children[0].data,
        opImg: data[0].data.children[0].data.preview,
        comments: data[1].data.children
      })
    } catch(error) {
      console.error(error);
    }
  }



  handleClose(){
    ipcRenderer.send('closeWin')
  }

  componentDidMount(){
    ipcRenderer.on('image', (event, arg) => {
      this.setState({
        permalink: arg
      })
      this.getComments(this.state.permalink)
    })
  }

  render(){
    return(
      <div>
          <Button onClick={this.handleClose} variant="light">X</Button>
        <div className='container'>
          <div className='title-div'>
            <h3 className='show-title'>{this.state.op.title}</h3>
          </div>
          <div className='title-div'>
            {this.state.opImg ? <img className="show-img" src={this.state.opImg.images[0].source.url}></img> : ''}
          </div>
          {this.state.op.selftext ? <p>{this.state.op.selftext}</p> : ''}
        </div>
        <div className='comments'>
          <ul className="new-list-group new-list-group-flush">
            {this.state.comments.map(comment =>(
              <li
                key={comment.data.id}
                className="new-list-group-item new-flex-container"
                >
                  <div className="comment">
                    <p className='author'>{comment.data.author}</p>
                    <div>{comment.data.body}</div>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Image
