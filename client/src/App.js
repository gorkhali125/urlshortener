import React, {Component} from 'react';
import './App.css';

import UrlFormContainer from './containers/UrlFormContainer';

class App extends Component {
  render() {
    return (
      <article className="Container">
        <div className="col-md-6 inside-div">
          <h2 className="app-title"> URL Shortener Service</h2>
          <UrlFormContainer />
        </div>
      </article>
    );
  }
}

export default App;
