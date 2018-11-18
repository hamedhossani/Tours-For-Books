import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { CookiesProvider } from 'react-cookie';

// Theme
import mainTheme from './theme/mainTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import App from './App';

// Create Store
const middleware = applyMiddleware(thunk);
// const store = createStore(
// 	rootReducer,
//   	compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ )
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(middleware)
)
// Render
ReactDOM.render(
  <CookiesProvider>
    <Provider store = {store}>
        <MuiThemeProvider theme={createMuiTheme(mainTheme)}>
          <BrowserRouter>
            <Route path='/' render={(props) => (<App/>)}/>
          </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
  </CookiesProvider>
    , document.getElementById('main')
);          
registerServiceWorker();
