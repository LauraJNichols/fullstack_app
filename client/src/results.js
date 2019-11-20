import React from 'react'
import axios from "axios";

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
        this.state = {
            results: [
                {
                    "title": "Agile 101" 
                },
                {
                    "title": "Agile 104"
                }
            ]
        };
      }

  render() {
    return <h1>Results</h1>
  }
}
export default Results