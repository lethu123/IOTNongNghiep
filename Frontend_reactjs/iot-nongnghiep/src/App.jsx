import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from './Main';
import Login from './Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="*" render={() => "handleNotFound"} />
      </Switch>
    </Router>
  );
}

export default App;
