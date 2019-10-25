// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    currentUrl: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (song, artist) => {  
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      song: song,
      artist: artist,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, songToApply, artistToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { song: songToApply, artist: artistToApply },
    });
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
        <Content data = {data}/>

        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ song: e.target.value })}
            placeholder="song name"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={(e) => this.setState({ artist: e.target.value })}
            placeholder="artist name"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.song, this.state.artist)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ songToApply: e.target.value })}
            placeholder="new song name"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ artistToApply: e.target.value })}
            placeholder="new artist name"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.songToApply, this.state.artistToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
    render() {
       return (
          <div>
             <h1>Songs to Play</h1>
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
          </div>
       );
    }
 }
 class Content extends React.Component {
    render() {
       return (
          <div>
            <Table striped bordered hover size="sm" variant="dark">
               <thead>
                   <tr>
                       <td>id</td>
                       <td>Song Title</td>
                       <td>Artist</td>
                   </tr>
               </thead>
               <tbody>
                   {
                       this.props.data.map((dat, i) => <TableRow key = {i} data = {dat} />)
                   }
               </tbody>
            </Table>
          </div>
       );
    }
 }

 class TableRow extends React.Component {
    render() {
       return (
          <tr>
             <td>{this.props.data.id}</td>
             <td>{this.props.data.song}</td>
             <td>{this.props.data.artist}</td>
          </tr>
       );
    }
 }

export default App;