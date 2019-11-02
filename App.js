import React from 'react';
//import AppContainer from './src/navigation/AppNavigator';
import AppContainer from './src/navigation/AppContainer';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';


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

  componentDidMount() {
    this.init();
    this.checkPermission();
    this.createNotificationListeners();
  }
  async init() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    fcmToken = await firebase.messaging().getToken();
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.messaging().onMessage(async (remoteMessage) => {
      try {
        const currentMessages = await AsyncStorage.getItem('messages');
        let messageArray = [];
        if (currentMessages != null) {
          messageArray = JSON.parse(currentMessages);
        }
        messageArray.push(remoteMessage.data);
        await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
      } catch (e) {
        // saving error
        console.log('FCM Message onMessage e :', e);
      }
    });

    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      try {
        const currentMessages = await AsyncStorage.getItem('messages');
        let messageArray = [];
        if (currentMessages != null) {
          messageArray = JSON.parse(currentMessages);
        }
        messageArray.push(remoteMessage.data);
        await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
      } catch (e) {
        // saving error
        console.log('FCM Message setBackgroundMessageHandler e :', e);
      }
    });

  }


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