import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from '../../screens/authLoading/AuthLoadingScreen';

export default createStackNavigator({ AuthLoading: AuthLoadingScreen },
    {
        initialRouteName: 'AuthLoading',
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