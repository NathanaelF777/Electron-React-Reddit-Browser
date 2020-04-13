import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ViewA from './App.js'
import ViewB from './components/Image.js'
class ViewManager extends Component {
  static Views() {
   return {
      viewA: <ViewA/>,
      viewB: <ViewB/>
     }
   }

  static View(props) {
     let name = props.location.search.substr(1);
     let view = ViewManager.Views()[name];
     return view;
   }

   render() {
    return (
       <Router>
         <div>
           <Route path='/' component={ViewManager.View}/>
         </div>
       </Router>
      );
    }
  }

export default ViewManager
