const redux = require("redux");

// membuat reducer
const rootReducer = (currentState = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return currentState + 1;
        case 'DECREMENT':
            return currentState - 1;
        default:
            return currentState;
    }
};

// membuat store
const store = redux.createStore(rootReducer);
console.log("state awal", store.getState());


// dispatch action increment
store.dispatch({type: 'INCREMENT'});
console.log("state setelah dispatch", store.getState());