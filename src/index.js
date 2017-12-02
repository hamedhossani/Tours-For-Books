import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

// Theme
import mainTheme from './theme/mainTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

// Components
import App from './App';

// Store
const middleware = applyMiddleware(thunk);
const store = createStore(
	rootReducer,
  	compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(mainTheme)}>
    <Provider store = {store}>
      <BrowserRouter>
        <Route component={App}/>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>, document.getElementById('main'));          
registerServiceWorker();