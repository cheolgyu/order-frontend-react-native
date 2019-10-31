import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import RNKakaoLogins from '@react-native-seoul/kakao-login';


if (!RNKakaoLogins) {
    console.error('Module is Not Linked');
}

const getLogin = async () => {
    let login = await RNKakaoLogins.login();
    return login;
};


const getProfile = async (token) => {
    let result = null;
    try {
        result = await RNKakaoLogins.getProfile();
        console.log('result', result);
    } catch (err) {
        console.log('err');
        console.log(err);
    }
    return result;
};

class Kakao extends React.Component {

    state = {
        profile: null,
    };

    kakaoLogin = async () => {
        try {
            const result = await getLogin();
            console.log('token: ' + result);

            if (result) {
                console.log('yes result');
                const profileResult = await getProfile(result);
                console.log('profile');
                console.log(profileResult);
                if (profileResult.resultcode === '024') {
                    Alert.alert('로그인 실패', profileResult.message);
                    return;
                }
                console.log(profileResult.email);
                alert(profileResult.email);
                result.profile = profileResult;


                // 성공시 다음 페이지로 넘어간다.

            } else {
                console.log('no result');
            }
        } catch (err) {
            console.log('error');
            console.log(err);
        }
    }


    render() {
        return (
            <View style={{
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}>
                <Button
                    title="카카오"
                    onPress={this.kakaoLogin}
                />

            </View>
        );
    }

}
export default Kakao;