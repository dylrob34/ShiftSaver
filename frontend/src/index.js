import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import ShiftSaver from './ShiftSaver';
import * as serviceWorker from './serviceWorker';

// The entry point of our application for the front end. Creates a single instance of the <App /> component
ReactDOM.render(<ShiftSaver />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
