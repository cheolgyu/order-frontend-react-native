import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../screens/app/HomeScreen';
import DetailsScreen from '../../screens/app/DetailsScreen';

export default createStackNavigator({ Home: HomeScreen, Details: DetailsScreen },
    {
        initialRouteName: 'Home',
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