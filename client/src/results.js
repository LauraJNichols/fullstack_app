import React from 'react'
import axios from "axios";
const queryString = require('query-string')

function getSearch(searchObj) {
    axios
      .get("http://localhost:5000/search", {
        params: {
          searchTerm: searchObj
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

class Results extends React.Component {

    constructor(props) {
        super(props);
        let searchParam = queryString.parse(this.props.location.search).searchTerm
        this.state = {
            results: [
                {
                    "title": "Agile 101" 
                },
                {
                    "title": "Agile 104"
                }
            ],
            searchTerm: searchParam
        };
        console.log(searchParam)
        console.log(this.state)
      }

  render() {
    return (
        <div>
            <h1>Search Term</h1>
            <h2>{this.state.searchTerm}</h2>
        </div>
    )
  }
}
export default Results