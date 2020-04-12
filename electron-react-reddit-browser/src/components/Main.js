import React, {Component} from 'react'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const Menu = electron.remote.Menu

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: []
    }
    this.getSub = this.getSub.bind(this)
    this.show = this.show.bind(this)
    this.initMenu = this.initMenu.bind(this)
  }

  async getSub(){
    try {
      let response = await fetch(`https://www.reddit.com/r/aww.json?raw_json=1`)
      let data = await response.json()
      this.setState({
        posts: data.data.children
      })
    } catch(error) {
      console.error(error);
    }
  }

  show(image) {
    console.log(image);
    ipcRenderer.send('toggle-show', image)
  }

  componentDidMount() {
    this.getSub()
    this.initMenu()
  }

  initMenu() {
    const menu = Menu.buildFromTemplate([
      {
        label: "Reddit",
        submenu: [
          { label: "New Window" },
          {
            label: "Settings",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-settings");
            }
          },
          { type: "separator" },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Menu Item 1" },
          { label: "Menu Item 2" },
          { label: "Menu Item 3" }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  }

  render(){
    return(
      <div>
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post => (
            <li
              key={post.data.id}
              className="list-group-item flex-container"
              onClick={() => this.show(post.data.preview.images[0].source.url)}
              >
              <img src={post.data.thumbnail} alt="thumbnail" className="thumbnail"/>
              <div>{post.data.title}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Main
