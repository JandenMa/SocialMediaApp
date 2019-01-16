import { createStore } from 'redux';

const store = createStore((state = {
    _open: false,
    _id: null,
    _title:'New Blog'
}, action) => {
    switch (action.type) {
        case 'add':
            state._open = true;
            state._title = 'New Blog';
            return state;
        case 'edit':
            state._open = true;
            state._id = action.id
            state._title = 'Edit Blog';
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