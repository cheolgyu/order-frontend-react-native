import React from 'react';
import { View, Text } from 'react-native';
import env from 'react-native-config'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {

    state = { loaded: 'false', fcmToken: null };

    constructor(props) {
        super(props);
        this.state = {
            loaded: 'false',
        };
    }

    componentDidMount() {
        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('fcmToken');
            if (value !== null) {
                // We have data!!
                this.setState({ loaded: 'true' });
                this.setState({ fcmToken: value });
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    async _init() {
        const URL = env.API_URL + "shops";
        try {
            let response = await fetch(URL, {
                method: 'GET'
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        if (this.state.loaded === 'false') {
            return (
                <View><Text>Loading...</Text></View>
            );
        } else {

            const runFirst = `
                (function() {
                    console.log("injectedJavaScript ");
                    console.log(this);
                    window.$nuxt.$store
                    .dispatch("device/set_fcm", '${this.state.fcmToken}', { root: true });
                })();
            
                true;
            `;
            const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36";

            return (
                <WebView
                    source={{ uri: 'http://localhost:3333/' }}
                    userAgent={userAgent}
                    injectedJavaScript={runFirst}
                />
            );

        }


    }
}
export default HomeScreen;