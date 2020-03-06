import React from 'react';
import { Text, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from '../components/Home'

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: { headerShown: false }
  }
})

const tabNavigator = createAppContainer(createBottomTabNavigator(
  {
    Tab1: { screen: HomeStack },
    Tab2: { screen: HomeStack },
    Tab3: { screen: HomeStack },
    Tab4: { screen: HomeStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        // to navigate to the top of stack whenever tab changes
        defaultHandler();
      },
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        return (<Text
          style={{
            height: '100%',
            width: '100%',
            color: '#f5ebe1',
            fontFamily: 'Poppins',
            fontSize: 13,
            letterSpacing: 0.26,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: '600'
          }}
        >{routeName}
        </Text>);
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f5ebe1',
      inactiveTintColor: '#f5ebe1',
      showIcon: true,
      activeBackgroundColor: '#d85055',
      labelStyle: {
        color: '#f5ebe1',
        fontSize: 13,
        fontWeight: '400'
      },
      style: {
        backgroundColor: '#f0696e',
        height: 55,
      },
    },
  }
));

export default tabNavigator;