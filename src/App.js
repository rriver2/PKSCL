// import log from './img/log.svg';
// import {Nav} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import AccessPage from './AccessPage';
import MainPage from './MainPage';
import ManagementPage from './ManagementPage';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

//스테이트

function App() {

  return (
    <div>
      <Switch>
        <Route path='/manage/:major'>
          <ManagementPage></ManagementPage>
        </Route>

        <Route path='/main/:major'>
          <MainPage></MainPage>
        </Route>

        <Route path='/' >
          <AccessPage> </AccessPage>
        </Route>

      </Switch>


    </div>
  );
}

export default App;