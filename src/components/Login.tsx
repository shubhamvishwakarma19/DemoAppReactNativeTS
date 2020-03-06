import React from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../Services/NavigationService';
import Toast from 'react-native-simple-toast';
import UserActions from "../Redux/userRedux";

interface State {
    email: string,
    password: string
}

interface Props {
    signupDataBase: Array<String>,
}

class Login extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    async UNSAFE_componentWillMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid))
    }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    onBackButtonPressAndroid = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to exit the app?',
            [
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
                { text: 'Cancel', onPress: () => console.log('ok') }
            ]
        );
    };

    validEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    _onPressLogin(email: string, password: string) {
        let { signupDataBase } = this.props
        let validEmail = this.validEmail(email)
        if (validEmail) {
            if (password.length > 5) {
                console.log(signupDataBase, "signupDataBasesignupDataBasesignupDataBase")
                signupDataBase.map((item: Object) => {
                    if (item.email === email && item.password === password) {
                        this.props.login()
                    } else {
                        Toast.show('User not fount please sign up', Toast.SHORT);
                    }
                })
            } else {
                Toast.show('invalid password', Toast.SHORT);
            }
        } else {
            Toast.show('invalid email', Toast.SHORT);
        }
    }

    render() {
        const { email = "", password = "" } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
                <Text style={styles.loginTitle}>Login</Text>
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
                <View style={styles.forgotView}>
                    <Text style={styles.forgotTxt}></Text>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => { this._onPressLogin(email, password) }}>
                    <Text style={styles.loginBtnTxt}>Login</Text>
                </TouchableOpacity>
                <View style={styles.bottomView}>
                    <Text style={styles.txtBottom1}>Don’t have an account?
                        <Text style={styles.txtBottom2} onPress={() => { NavigationService.navigate("SignupScreen", { screen: "TabBarScreen" }) }}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        state: state,
        error: state.user.error,
        fetching: state.user.fetching,
        user: state.user,
        signupDataBase: state.user.signupDataBase
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: () => dispatch(UserActions.login())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
    },


})