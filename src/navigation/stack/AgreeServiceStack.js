import { createStackNavigator } from 'react-navigation-stack';
import PrivacyScreen from '../../screens/agree/PrivacyScreen';
import TermsScreen from '../../screens/agree/TermsScreen';

export default createStackNavigator({ Privacy: PrivacyScreen, Terms: TermsScreen },
    {
        initialRouteName: 'Privacy',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);