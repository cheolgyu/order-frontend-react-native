import React from 'react';
import { View, Text } from 'react-native';
import env from 'react-native-config'
import { WebView } from 'react-native-webview';

class HomeScreen extends React.Component {

    componentDidMount() {
        let res = this._init();
    }

    async _init() {
        const URL = env.API_URL + "shops";
        console.log("==============================");
        console.log(URL);
        try {
            let response = await fetch(URL, {
                method: 'GET'
            });
            let responseJson = await response.json();
            console.log("==============================");
            console.log(responseJson);
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <WebView
                source={{ uri: 'https://github.com/facebook/react-native' }}
                style={{ marginTop: 20 }}
            />
        );
    }
}
export default HomeScreen;