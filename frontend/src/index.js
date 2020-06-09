import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import reducers from './store/reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
  ));


  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.querySelector('#root'));
