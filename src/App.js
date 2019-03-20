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
                <Route path="/" exact component={LogReg} />
                <Route path="/homepage" exact component={Homepage} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/recipe/:title" exact component={Recipe} />
                <Route path="/add" exact component={Add} />
                <Route path="/recipe/edit/:title" exact component={Edit} />
            </Switch>
            </div>
        </BrowserRouter>
    );
  }
};

