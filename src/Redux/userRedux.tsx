import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({

    login: null,
    loginSuccess: ['data'],
    loginFailure: ['error'],

    signin: ['data'],
    signinSuccess: ['data'],
    signinFailure: ['error'],

    logout: null,
    logoutSuccess: ['data'],
    logoutFailure: ['error'],

})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    token: null,
    fetching: false,
    error: null,
    exists: null,
    signupDataBase: [],
    loginStatus: false
})

/* ------------- Reducers ------------- */

/* login */
export const login = (state: Object) => {
    return { ...state, fetching: false }
}
export const loginSuccess = (state: Object, action: Object) => {
    return { ...state, fetching: false, loginStatus: true }
}
export const loginFailure = (state: Object, error: Object) => {
    return { ...state, fetching: false }
}

/* signin */
export const signin = (state: Object) => {
    return { ...state, fetching: true, error: null }
}
export const signinSuccess = (state: Object, action: any) => {
    const { data } = action
    return { ...state, fetching: false, error: null, signupDataBase: data }
}
export const signinFailure = (state: Object, error: Object) => {
    return { ...state, fetching: false, error }
}

/* logout */
export const logout = (state: Object) => {
    return { ...state, fetching: true }
}
export const logoutSuccess = (state: Object, action: Object) => {
    return { ...state, fetching: false, loginStatus: false }
}
export const logoutFailure = (state: Object, error: Object) => {
    return { ...state, fetching: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

    [Types.LOGIN]: login,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_FAILURE]: loginFailure,

    [Types.SIGNIN]: signin,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: signinFailure,

    [Types.LOGOUT]: logout,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
    [Types.LOGOUT_FAILURE]: logoutFailure,

})
