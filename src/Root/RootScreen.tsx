import React from 'react'
import { View, Text } from "react-native";
import NavigationService from '../Services/NavigationService';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../components/Home';
import tabNavigator from '../navigations/tabNavigator';

// import CreateAccount from '../components/CreateAccount';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Splash from '../components/Splash';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideMenu from '../components/SideMenu';

console.disableYellowBox = true;

const MyDrawerNavigator = createDrawerNavigator({
  Home: { screen: tabNavigator },
  Logout: { screen: tabNavigator },
}, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerWidth: 250,
  useNativeAnimations: true,
  contentComponent: SideMenu
});

const MainNavigator = createStackNavigator(
  {
    Splash: { screen: Splash, navigationOptions: { headerShown: false } },
    LoginScreen: { screen: Login, navigationOptions: { headerShown: false } },
    SignupScreen: { screen: Signup, navigationOptions: { headerShown: false } },
    TabBarScreen: MyDrawerNavigator
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator