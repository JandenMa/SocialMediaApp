import { createStore } from 'redux';

const store = createStore((state = {
    _auth: false,
    _username: null,
    _token: null,
}, action) => {
    switch (action.type) {
        case 'login':
            state._auth = true;
            return state;
        case 'logout':
            state._auth = false;
            return state;
        default:
            break;
    }
})

export default store;