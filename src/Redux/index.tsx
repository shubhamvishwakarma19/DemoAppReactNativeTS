import { combineReducers } from 'redux'

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
    user: require('./userRedux').reducer,
})

export default rootReducer;
