/**************
 * Event Bus user to communicate between components in place of REDUX.
 * Small application Small needs.
 */
const Event = {
    _events:{},
    // registed any event REquired...
    on(eventName, event) {
        if (typeof event !== 'function') throw new Error(`${eventName} is not a function`);
        this._events[eventName] = event;
    },
    // emit any registered event to that module...
    emit(eventName,param,next) {
        if (!this._events[eventName]) throw new Error(`${eventName} is not registered`);
        this._events[eventName](param);
        if (typeof next == 'function') next();
    }
}
/*******
 * List module specific for List operation from out side...
 */
const List = Object.create(Event);
List._events = {}
/*******
 * Tab module to perform tab specific Operations....
 */
const Tab  = Object.create(Event);
Tab._events = {}

console.log(Tab,List);
export {List,Tab};