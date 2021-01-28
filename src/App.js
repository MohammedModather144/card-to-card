import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Success from './Components/Success';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import Confirm from './Components/Confirm';
import Worng from './Components/Worng';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={Home} path="/home" exact />
          <PublicRoute component={Confirm} path="/confirm" exact />
          <PrivateRoute component={Success} path="/success" exact />
          <PrivateRoute component={Worng} path="/worng" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
