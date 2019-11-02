import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Image, View, Text } from 'react-native';

import AgreeServiceStack from './stack/AgreeServiceStack'
//import AuthLoadingStack from './stack/AuthLoadingStack';
import AuthStack from './stack/AuthStack';
import AppStack from './stack/AppStack';

export default createAppContainer(
    createSwitchNavigator(
        {
            AgreeService: AgreeServiceStack,
            //AuthLoading: AuthLoadingStack,
            Auth: AuthStack,
            App: AppStack,
        },
        {
            initialRouteName: 'App',
        }
    )
);