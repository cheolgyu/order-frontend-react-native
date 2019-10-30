import { createStackNavigator } from 'react-navigation-stack';
import PrivacyScreen from '../screens/agree/PrivacyScreen';
import TermsScreen from '../screens/agree/TermsScreen';

export default createStackNavigator({ Privacy: PrivacyScreen, Terms: TermsScreen });