import React from 'react';
import { View, Text, Button } from 'react-native';
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';

const initials = {
    kConsumerKey: 'MqcqaLXeMKPTdcHtdgqs',
    kConsumerSecret: 'wEBVDMRFma',
    kServiceAppName: 'togo82',
    kServiceAppUrlScheme: 'dooboolaburlscheme', // only for iOS
};

const naverLogin = (props) => {
    return new Promise(function (resolve, reject) {
        console.log(props);
        NaverLogin.login(props, (err, token) => {
            console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
            if (err) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};

const naverLogout = () => {
    NaverLogin.logout();
};

const getNaverProfile = async (token) => {
    let result = null;
    try {
        result = await getProfile(token);
    } catch (err) {
        console.log('err');
        console.log(err);
    }
    return result;
};

class Naver extends React.Component {
    constructor(props) {
        super(props);

        console.log(
            '\n\n Initial Page :: src/components/pages/First/index.js \n\n',
        );

        this.state = {
            isNaverLoggingin: false,
            theToken: 'token has not fetched',
        };
    }

    // 위와 같이 함수를 짜주고 아래서 사용한다.
    onNaverLogin = async () => {
        try {
            const result = await naverLogin(initials);
            console.log('token: ' + result);

            if (result) {
                console.log('yes result');
                const profileResult = await getNaverProfile(result);
                console.log('profile');
                console.log(profileResult);
                if (profileResult.resultcode === '024') {
                    Alert.alert('로그인 실패', profileResult.message);
                    return;
                }
                console.log(profileResult.response.email);
                alert(profileResult.response.email);
                result.profile = profileResult;


                // 성공시 다음 페이지로 넘어간다.

            } else {
                console.log('no result');
            }
        } catch (err) {
            console.log('error');
            console.log(err);
        }
    };


    render() {
        return (
            <View style={{
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}>
                <Button
                    title="네이버 로그인"
                    onPress={this.onNaverLogin}
                />
            </View>
        );
    }

}
export default Naver;