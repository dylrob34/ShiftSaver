// This module contains the object that handles global states in this application, most importantly the loggedIn state.
// The App component subscribes to the loggedIn state, so when it changes, a method is run in App that checks the new loggedIn state
// and updates accordingly.
// Any component that fetches from the backend should update this global state to loggedIn:false when a request
// is made and the server responds back loggedIn:false. This will load the login page.


import { EventEmitter } from 'events';

var emitter = new EventEmitter();
 
var loginState = false;
 
export function getLoginState() {
    return loginState;
    
}
export function subscribe(callback) {
    emitter.addListener('update', callback);
}
export function unsubscribe(callback) {
    emitter.removeListener('update', callback);
}
export function updateLoginState(state) {
    loginState = state;
    emitter.emit('update');
}
