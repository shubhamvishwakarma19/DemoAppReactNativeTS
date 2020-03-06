import { takeLatest, takeEvery } from 'redux-saga/effects';
import API from "../Services/Api_Call";

/* ------------- Types ------------- */
import { UserTypes } from '../Redux/userRedux';

/* ------------- Connect Types To Sagas ------------- */
import { login, signin, logout, } from './userSagas';


let api = API.create();

function* mySaga() {
    yield takeLatest(UserTypes.LOGIN, login, api);
    yield takeLatest(UserTypes.SIGNIN, signin, api);
    yield takeLatest(UserTypes.LOGOUT, logout, api);
}


export default mySaga;