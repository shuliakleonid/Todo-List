import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from '../../pages/login/Login';
import NotFound from '../../pages/not-found/not-found';
import {Dashboard} from '../../pages/dashboard/Dashboard'
import {CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {AuthStateType} from '../../reducers/auth-reducer';


const App = () => {
  const {isInitialized} = useSelector<AppRootStateType, AuthStateType>(state => state.auth)
  if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
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
