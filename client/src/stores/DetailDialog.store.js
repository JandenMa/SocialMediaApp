import { createStore } from 'redux';

const store = createStore((state = {
    _open: false,
    _id: null,
}, action) => {
    switch (action.type) {
        case 'add':
            state._open = true;
            return state;
        case 'edit':
            state._open = true;
            state._id = action.id
            return state;
        case 'close':
            state._open = false;
            state._id = null
            return state;
        default:
            break;
    }
})

export default store;