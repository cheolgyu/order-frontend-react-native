import React from 'react';
import { View, Text, Button } from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

type ErrorWithCode = Error & { code?: string };

type State = {
    error: ?ErrorWithCode,
    userInfo: ?User,
};


class LoginScreen extends React.Component {
    state = {
        userInfo: null,
        error: null,
    };

    async componentDidMount() {
        this._configureGoogleSignIn();
        await this._getCurrentUser();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: '411774737290-040333sllhkvbghdst8mgchg37or240n.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }


    async _getCurrentUser() {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo, error: null });
        } catch (error) {
            const errorMessage =
                error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
            this.setState({
                error: new Error(errorMessage),
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>LoginScreen Screen</Text>
                <Button
                    title="Go to privacy"
                    onPress={() => this.props.navigation.navigate('Privacy')}
                />
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn} />
            </View>
        );
    }
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            alert(userInfo.user.name);
            this.setState({ userInfo, error: null });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    };
}
export default LoginScreen;