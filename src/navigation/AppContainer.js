import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Image, View, Text } from 'react-native';

import AgreeServiceStack from './AgreeServiceStack';
import AuthLoadingStack from './AuthLoadingStack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default createAppContainer(
    createSwitchNavigator(
        {
            AgreeService: AgreeServiceStack,
            AuthLoading: AuthLoadingStack,
            Auth: AuthStack,
            App: AppStack,
        },
        {
            initialRouteName: 'AgreeService',
        }
    )
);