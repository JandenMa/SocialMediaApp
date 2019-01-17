import { createStore } from 'redux';

const store = createStore((state = {
    _open: false,
    _id: null,
    _isNew:true
}, action) => {
    switch (action.type) {
        case 'add':
            state._open = true;
            state._isNew = action.isNew;
            return state;
        case 'edit':
            state._open = true;
            state._id = action.id
            state._isNew = action.isNew;
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