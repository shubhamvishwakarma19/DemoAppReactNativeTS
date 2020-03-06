import React from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import UserActions from "../Redux/userRedux";
import NavigationService from '../Services/NavigationService';
import Toast from 'react-native-simple-toast';

interface State {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface Props {
    signupDataBase: Array<Object>,
    signin: Function
}

class Signup extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    validEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _onPressSignUp(userName: string, email: string, password: string, confirmPassword: string) {

        let { signupDataBase = [] } = this.props
        if (userName.length > 7) {
            let validEmail = this.validEmail(email)
            if (validEmail) {
                if (password.length > 5) {
                    if (password === confirmPassword) {
                        let data = { userName, email, password, confirmPassword }
                        signupDataBase.push(data)
                        this.props.signin(signupDataBase)
                    } else {
                        Toast.show('not same confirm password', Toast.SHORT);
                    }
                } else {
                    Toast.show('invalid password', Toast.SHORT);
                }
            } else {
                Toast.show('invalid email', Toast.SHORT);
            }
        } else {
            Toast.show('invalid userName', Toast.SHORT);
        }
    }

    render() {
        const { userName = "", email = "", password = "", confirmPassword = "" } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.loginTitle}>Signup</Text>

                <TextInput
                    style={styles.textInputSty}
                    placeholder="Username"
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={userName}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInputSty}
                    placeholder="E-mail"
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={email}
                    keyboardType='email-address'
                />

                <TextInput
                    style={styles.textInputSty}
                    placeholder="Password"
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({ password: text })}
                    value={password}
                    keyboardType='numeric'
                />

                <TextInput
                    style={styles.textInputSty}
                    placeholder="Confirm Password"
                    placeholderTextColor='#000'
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    value={confirmPassword}
                    keyboardType='numeric'
                />

                <TouchableOpacity style={styles.loginBtn} onPress={() => { this._onPressSignUp(userName, email, password, confirmPassword) }}>
                    <Text style={styles.loginBtnTxt}>SignUp</Text>
                </TouchableOpacity>

                <View style={styles.bottomView}>
                    <Text style={styles.txtBottom1}>Already have an account?
                    <Text style={styles.txtBottom2}
                            onPress={() => { NavigationService.navigate("LoginScreen", { screen: "LoginScreen" }) }}
                        >  Login</Text></Text>
                </View>

            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = (state: { user: { error: any; fetching: any; signupDataBase: any }; }) => {
    return {
        state: state,
        error: state.user.error,
        fetching: state.user.fetching,
        user: state.user,
        signupDataBase: state.user.signupDataBase
    }
}

const mapDispatchToProps = (dispatch: { (arg0: any): void; (arg0: any): void; (arg0: any): void; }) => {
    return {
        signin: (data: any) => dispatch(UserActions.signin(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginTitle: {
        marginTop: '15%',
        fontSize: 80,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: '10%'
    },
    txtBottom1: {
        marginBottom: 25,
        textAlign: 'center',
        color: '#000',
        fontSize: 17
    },
    txtBottom2: {
        marginBottom: 25,
        textAlign: 'center',
        color: '#4FC1DA',
        fontSize: 17,
        fontWeight: '600'
    },
    bottomView: {
        marginTop: 20,
        alignSelf: 'center',
        width: '90%',
        flex: 1
    },
    loginBtnTxt: {
        textAlignVertical: 'center',
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotTxt: {
        color: '#000',
        textAlign: "right",
        fontSize: 17,
        fontWeight: '600',
    },
    loginBtn: {
        height: 60,
        backgroundColor: '#9DCB3B',
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'center',
        marginTop: 35,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    forgotView: {
        height: 46,
        alignSelf: 'center',
        width: '90%',
        marginTop: 30,
        justifyContent: "center",
        alignContent: "center",
    },
    textInputSty: {
        paddingLeft: 10,
        height: 46,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#000',
        width: '90%',
        marginTop: '3%'
    }
})