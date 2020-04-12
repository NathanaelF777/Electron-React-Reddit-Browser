import React, {Component} from 'react'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: ''
    }
  }

  componentDidMount(){
    ipcRenderer.on('image', (event, arg) => {
      this.setState({
        imageUrl: arg
      })
    })
  }

  render(){
    return(
      <div>
        <img src={this.state.imageUrl} alt='image' style={{maxWidth: '100%'}} />
      </div>
    )
  }
}

export default Image
