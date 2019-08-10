/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Login from './Login';
import Feed from './Feed';
import Search from './Search';
import Details from './Details';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";


const AuthStack = createStackNavigator({
  SignIn: Login,
});

const FeedTabbedStack = createBottomTabNavigator({
  Feed: Feed,
  Search: Search
})

const AppStack = createStackNavigator({
  Feed: FeedTabbedStack,
  Details: Details
})


export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
));