import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import UserActions from "../Redux/userRedux";

interface State {
    email: string,
    password: string
}

interface Props {
    navigation: { toggleDrawer: any },
}

class SideMenu extends React.Component<Props, State> {

    logoutAlert = () => {
        this.props.navigation.toggleDrawer()
        Alert.alert(
            'Confirm',
            'Are you sure that you want to logout?',
            [
                { text: 'Yes', onPress: () => this.props.logout() },
                { text: 'Cancel', onPress: () => console.log('ok') }
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.homeTitle}
                    onPress={() => { this.logoutAlert() }}
                >Logout</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    homeTitle: {
        marginTop: '15%',
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: '10%'
    },
    navHeader: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        backgroundColor: 'lavender'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const mapStateToProps = (state: any) => {
    return {
        state: state,
        error: state.user.error,
        fetching: state.user.fetching,
        exists: state.user.exists,
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)