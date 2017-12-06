import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import * as firebase from "firebase";

// Theme
import mainTheme from './theme/mainTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

// Components
import App from './App';

// Create Store
// const middleware = applyMiddleware(thunk);
// const store = createStore(
// 	rootReducer,
//   	compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

// Initialize Database
var config = {
    apiKey: "AIzaSyDX8HXto42pWC12zdcZwrt-RIPScFyJBik",
    authDomain: "bloggy-170620.firebaseapp.com",
    databaseURL: "https://bloggy-170620.firebaseio.com",
    projectId: "bloggy-170620",
    storageBucket: "bloggy-170620.appspot.com",
    messagingSenderId: "634344137184"
};
firebase.initializeApp(config);

// Render
ReactDOM.render(
    <MuiThemeProvider theme={createMuiTheme(mainTheme)}>
      <BrowserRouter>
        <Route component={App}/>
      </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('main'));          
// registerServiceWorker();

{/**
    <Provider store = {store}>**/}
    {/**</Provider>
  **/}