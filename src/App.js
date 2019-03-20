import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LogReg from './views/LogReg';
import Homepage from './views/Homepage';
import Logout from './views/Logout';
import Recipe from './views/Recipe';
import Add from './views/Add';
import Edit from './views/Edit';
import './App.css';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>  
            <div className="App">
            <Switch>
                <Route exact path="/" component={LogReg} />
                <Route exact path="/homepage" component={Homepage} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/recipe/:title" component={Recipe} />
                <Route exact path="/add" component={Add} />
                <Route exact path="/recipe/edit/:title" component={Edit} />
            </Switch>
            </div>
        </BrowserRouter>
    );
  }
};

