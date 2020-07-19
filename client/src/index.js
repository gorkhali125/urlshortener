import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Notfound from './components/Notfound';
import ResolveUrlHash from './components/ResolveUrlHash';

import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/:shortUrl" component={ResolveUrlHash} />
            <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
