// src/store/store.js
import { createStore } from 'redux';
import rootReducer from '../reducers';  // This should now work

const store = createStore(rootReducer);


export default store;
