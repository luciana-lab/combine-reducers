import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import manageAuthorsAndBooks from './reducers/manageAuthorsAndBooks';
// new file name:
import rootReducer from './reducers/manageAuthorsAndBooks';

// const store = createStore(manageAuthorsAndBooks, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// rootReducer is the default export of manageAuthorsAndBooks.js, the app will continu to work with this code above, but we can update it to reflect the new name
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
