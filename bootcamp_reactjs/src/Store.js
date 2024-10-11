import { createStore } from 'redux';

// Initial state
const initialState = {
    count: 0,  // Nilai awal adalah 0
};

// Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,  // Tambah 1
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,  // Kurangi 1
            };
        case 'RESET':  // Reset ke 0
            return {
                ...state,
                count: 0,  // Reset nilai menjadi 0
            };
        default:
            return state;  // Jika action tidak dikenali, kembalikan state semula
    }
};

// Create Redux store
const store = createStore(counterReducer);

export default store; 

// increment, decrement, dan reset
export const increment = () => {
    return {
        type: 'INCREMENT',  // menambah angka
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT',  // mengurangi angka
    };
};

export const reset = () => {
    return {
        type: 'RESET',  // reset angka menjadi 0
    };
};
