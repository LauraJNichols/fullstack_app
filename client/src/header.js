import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Repertoire from './repertoire'
import Expenses from './expenses'
import { Route, BrowserRouter as Router } from 'react-router-dom'

class Header extends React.Component {
    render() {
       return (
          <div className="container mt-4">

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
                <div >
                  <Route path="/expenses" component={Expenses} />
                  <Route path="/repertoire" component={Repertoire} />
                </div>
            </Router>     
          </div>
       );
    }
}

export default Header;