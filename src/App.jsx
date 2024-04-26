import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContentUpload from './components/ContentUpload';
import ContentDisplay from './components/ContentDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/upload" component={ContentUpload} />
          <Route path="/" component={ContentDisplay} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;