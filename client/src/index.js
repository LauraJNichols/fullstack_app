// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Expenses from './expenses'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Repertoire from './repertoire';

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register();