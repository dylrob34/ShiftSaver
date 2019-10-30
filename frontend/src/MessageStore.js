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
    console.log("updated");
    loginState = state;
    emitter.emit('update');
}
