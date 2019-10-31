import React from 'react';
import { View, Text, Button } from 'react-native';

import Google from '../../components/login/Google'
import Naver from '../../components/login/Naver'
import Kakao from '../../components/login/Kakao'


class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '3.로그인'
        };
    };
    state = {
        userInfo: null,
        error: null,
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>LoginScreen </Text>
                <Button
                    title="Go to privacy"
                    onPress={() => this.props.navigation.navigate('Privacy')}
                />
                <Google />
                <Naver />
                <Kakao />
            </View>
        );
    }

}
export default LoginScreen;