// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Expenses from './expenses'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Repertoire from './repertoire';

const routing = (
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/repertoire" component={Repertoire} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.register();