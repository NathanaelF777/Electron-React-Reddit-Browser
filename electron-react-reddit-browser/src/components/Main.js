import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Icon from '../icon.png'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const Menu = electron.remote.Menu

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      search: '',
      error: false,
      currentSub: false
    }
    this.getSub = this.getSub.bind(this)
    this.show = this.show.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  async getSub(sub){
    try {
      let response = await fetch(`https://www.reddit.com/r/${sub}.json?raw_json=1`)
      let data = await response.json()
      this.setState({
        posts: data.data.children,
        search: '',
        error: false,
        currentSub: sub
      })
    } catch(error) {
      console.error(error);
      this.setState({
        error: true
      })
    }
  }

  handleChange(e){
    this.setState({[e.target.id]: e.target.value})
  }

  handleSearch(e){
    e.preventDefault()
    this.getSub(this.state.search)
  }

  show(image) {
    console.log(image);
    ipcRenderer.send('toggle-show', image)
  }

  componentDidMount() {
    this.getSub('programmerhumor')
  }



  render(){
    return(
      <div>
        <Navbar className="bg-light justify-content-around">
          <Form inline onSubmit={this.handleSearch}>
            <FormControl type="text" placeholder="r/" className="mr-sm-2" value={this.state.search} id="search" onChange={this.handleChange}/>
            <Button type='submit' variant="outline-warning" >Search</Button>
          </Form>

        </Navbar>
        {this.state.currentSub ? <h3 className="title">Welcome to r/{this.state.currentSub}</h3> : ''}
        <ul className="new-list-group new-list-group-flush">
          {this.state.error ? <h5 className='warning'>The sub you are looking for does not exist.</h5> : ''}
          {this.state.posts.map(post => (
            <li
              key={post.data.id}
              className="new-list-group-item new-flex-container"
              onClick={() => this.show(post.data.permalink)}
              >
              {post.data.thumbnail_height
                ? <img src={post.data.thumbnail} alt="thumbnail" className="thumbnail"/>
              : <img src={Icon} alt="thumbnail" className="thumbnail"/>
              }

              <div>{post.data.title}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Main
