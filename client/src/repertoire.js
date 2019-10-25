// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'

import 'bootstrap/dist/css/bootstrap.min.css';

class Repertoire extends Component {

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

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };


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

  render() {
    const { data } = this.state;
    return (
      <div>
          
        <SongTable data = {data}/>

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
 class SongTable extends React.Component {
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

export default Repertoire;