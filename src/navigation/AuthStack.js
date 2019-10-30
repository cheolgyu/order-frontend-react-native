import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/auth/LoginScreen';

export default createStackNavigator({ Login: LoginScreen },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });