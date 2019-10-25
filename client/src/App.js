// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Repertoire from './repertoire'
import Expenses from './expenses'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

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

class Header extends React.Component {
    render() {
       return (
          <div>

            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="home">Hub</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="repertoire">Repertoire</Nav.Link>
                <Nav.Link href="expenses">Expenses</Nav.Link>
              </Nav>
              {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form> */}
            </Navbar>    
            <Router>
                <div>
                  <Route path="/expenses" component={Expenses} />
                  <Route path="/repertoire" component={Repertoire} />
                </div>
            </Router>     
          </div>
       );
    }
 }

export default App;