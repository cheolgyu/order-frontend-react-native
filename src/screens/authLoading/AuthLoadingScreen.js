import React from 'react';
import { View, Text } from 'react-native';

class AuthLoadingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>AuthLoadingScreen Screen</Text>
            </View>
        );
    }
}
export default AuthLoadingScreen;