import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./src/Stores/index";
import Root from "./src/Root/RootScreen";
import Splash from './src/components/Splash';
import AppNavigator from './src/Root/RootScreen';
import NavigationService from './src/Services/NavigationService';

const storeConfig = configureStore();

class App extends React.Component {
  render() {
    let splashComponent = <Splash />
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={storeConfig.store}>
          <PersistGate loading={splashComponent} persistor={storeConfig.persistor}>
            <StatusBar barStyle="dark-content" />
            <AppNavigator ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }} />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
});

export default App;
