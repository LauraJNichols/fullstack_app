import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect, Link } from 'react-router-dom'
import Results from './results'

class SearchBar extends Component {

    constructor(props){
        super(props)
        this.state = {
            // site: "",
            searchTerm: ""
          };        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ searchTerm: evt.target.value });
    }

    render() {
        return (
            <div>
                <div className="c-form-combo__cell">
                    <input
                        type="text"
                        name="searchTerm"
                        className="c-form-combo__input c-form-input"
                        placeholder="Search for your next course"
                        id="f-combo"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </div>
                <Link to={{
                    pathname: `/results`,
                    search: `?searchTerm=${this.state.searchTerm}`
                }} className="btn btn-primary">Search</Link>
            </div>
            
        );
    }
}
export default SearchBar;