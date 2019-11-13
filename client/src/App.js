// /client/App.js
import React, { Component } from 'react';
import Header from './header'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // initialize our state
  state = {
    currentUrl: null,
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  //
  // MongoDB to Web Page:
  // If data contains "id" and "message" keys, they will appear. 
  // If either are missing, they will not appear. Simiarly, any extra keys will not appear or interact with the page. 
  render() {
    const { data } = this.state;
    return (
      <div>
          
        <Header/>
        <div name="How do I put everything here? I want it squished."></div>

      </div>
    );
  }
}



export default App;