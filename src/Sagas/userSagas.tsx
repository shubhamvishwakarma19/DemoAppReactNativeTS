import { call, put, select } from 'redux-saga/effects'
import UserActions from '../Redux/userRedux'
import NavigationService from '../Services/NavigationService';
import Toast from 'react-native-simple-toast';

function* login(api: any, action: any) {
    try {
        yield put(UserActions.loginSuccess());
        Toast.show('Login successfully', Toast.SHORT);
        setTimeout(function () {
            NavigationService.navigateAndReset("TabBarScreen", { screen: "TabBarScreen" })
        }, 1000)
    } catch (err) {
        yield put(UserActions.loginFailure())
    }
}

function* signin(api: any, action: any) {
    try {
        let { data } = action;
        yield put(UserActions.signinSuccess(data))
        Toast.show('Successfully sign in', Toast.SHORT);
        setTimeout(function () {
            NavigationService.navigate("LoginScreen", { screen: "LoginScreen" })
        }, 1000)
    } catch (err) {
        yield put(UserActions.signinFailure(err))
    }
}

function* logout(api: any, action: any) {
    try {
        NavigationService.navigateAndReset('LoginScreen', { screen: "LoginScreen" })
        yield put(UserActions.logoutSuccess());
    } catch (err) {
        NavigationService.navigateAndReset('LoginScreen', { screen: "LoginScreen" })
        yield put(UserActions.logoutFailure())
    }
}


export { login, signin, logout }