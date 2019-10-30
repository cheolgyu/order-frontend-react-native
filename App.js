import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import AppContainer from './src/navigation/AppNavigator';
import AppContainer from './src/navigation/AppContainer';

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

class App extends React.Component {
  onNavigationStateChange(prevState, newState, action) {
    console.log("", prevState, newState, action);
  }
  someEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: someRouteName })
      );
  }
  render() {
    return (
      <AppContainer
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          const previousRouteName = getActiveRouteName(prevState);

          if (previousRouteName !== currentRouteName) {
            // the line below uses the @react-native-firebase/analytics tracker
            // change the tracker here to use other Mobile analytics SDK.
            //analytics().setCurrentScreen(currentRouteName, currentRouteName);
          }
        }}
        uriPrefix=""
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}

export default App;