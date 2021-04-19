import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from '../../pages/login/Login';
import NotFound from '../../pages/not-found/not-found';
import {Dashboard} from '../../pages/dashboard/Dashboard'


const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path={'/'} render={() => <Dashboard/>}/>
          <Route path={'/login'} render={() => <Login/>}/>
          <Route  render={() => <NotFound/>}/>
        </Switch>
      </Router>
  );
};

export default App;
