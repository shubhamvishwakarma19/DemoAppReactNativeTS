import React from 'react'
import { View, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

interface State {
    isLoading: Boolean,
}

interface Props {

}

export default class Loader extends React.Component<Props, State> {
    constructor(Props: Readonly<Props>) {
        super(Props)
        this.state = {
            isLoading: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
});
