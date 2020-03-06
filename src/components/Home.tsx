import React from 'react';
import {
    StatusBar,
    BackHandler,
    View,
    Alert,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

interface State {
    email: string,
    password: string
}

interface Props {
    navigation: { toggleDrawer: any, addListener: any },
}

class Home extends React.Component<Props, State> {
    handleBackButtonClick: any;
    _willBlurSubscription: any;
    backHandler: any;
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = async () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to exit the app?',
            [
                { text: 'Yes', onPress: () => this.goBack() },
                { text: 'Cancel', onPress: () => console.log('ok') }
            ], { cancelable: false },
        ); // works best when the goBack is async
        return true;
    }

    goBack = () => {
        BackHandler.exitApp()
    }

    static navigationOptions = {
        drawerLabel: 'Home',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navHeader}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <Image
                            style={styles.homeIcon}
                            source={require('../images/Menu.png')}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.text}>Home</Text>
                    </View>
                </View>
                <Text style={styles.homeTitle}>Home</Text>
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
    },
    homeIcon: {
        margin: 10
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)