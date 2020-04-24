import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themefile from './util/theme';
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types'
import axios from 'axios'
import {logoutUser, getUserData} from './redux/actions/userAction'
//Components
import Navbar from './Components/layout/Navbar'
//Pages
import home from './pages/home'
import Login from './pages/Login'
import signup from './pages/signup'
import user from './pages/user'

const theme = createMuiTheme(themefile)

axios.defaults.baseURL = "https://asia-east2-socialape-bfbe5.cloudfunctions.net/api"
//Tell browser to use this default URL

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }  
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store ={store}>
        <div className="App">
          <Router>
           <Navbar></Navbar>
            <div className ="container">
            <Switch>
             <Route exact path ='/' component ={home}/>
             <AuthRoute exact path ='/Login' component ={Login} />
             <AuthRoute exact path ='/signup' component ={signup}/>
             <Route exact path="/users/:handle" component={user}/>
             <Route exact path="/users/:handle/scream/:screamId" component={user}/>
            </Switch>
            </div>
         </Router>
       </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
