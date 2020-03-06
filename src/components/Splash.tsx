import React from 'react';
import { StatusBar, View, StyleSheet, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../Services/NavigationService';


class Splash extends React.Component {

  componentDidMount() {
    try {
      let that = this
      setTimeout(() => {
        if (that.props.loginStatus) {
          NavigationService.navigate("TabBarScreen", { screen: "TabBarScreen" })
        } else {
          NavigationService.navigate("LoginScreen", { screen: "LoginScreen" })
        }
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Splash
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
  },
  backgroundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
});

const mapStateToProps = (state: any) => {
  return {
    state: state,
    error: state.user.error,
    fetching: state.user.fetching,
    exists: state.user.exists,
    loginStatus: state.user.loginStatus
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)