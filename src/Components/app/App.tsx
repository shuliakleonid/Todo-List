import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Login} from '../../pages/login/Login';
import NotFound from '../../pages/not-found/not-found';
import {Dashboard} from '../../pages/dashboard/Dashboard'
import {AuthStateType, initializeApp} from '../../reducers/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@material-ui/core';
import {AppRootStateType} from '../../state/store';


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeApp())
  }, [])
  const {isInitialized} = useSelector<AppRootStateType, AuthStateType>(state => state.auth)
  if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
  return (
      <Switch>
        <Route exact path={'/'} render={() => <Dashboard/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
        <Route render={() => <NotFound/>}/>
      </Switch>
  );
};

export default App;
