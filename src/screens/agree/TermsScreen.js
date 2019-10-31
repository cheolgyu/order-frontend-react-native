import React from 'react';
import { Button, Image, View, Text, StyleSheet, Platform, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const text = Platform.select({
    ios: '동의합니까?',
    android:
        '동의합니까?',
});

class TermsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '2.개인정보보호 및 약관'
        };
    };
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            const agree_privacy = await AsyncStorage.getItem('@agree:privacy');
            const agree_terms = await AsyncStorage.getItem('@agree:terms');
            const auth_login = await AsyncStorage.getItem('@auth:login');
            var nav = "Terms";
            if (agree_privacy) {
                if (agree_terms) {
                    if (auth_login) {
                        nav = "App";
                    } else {
                        nav = "Auth";
                    }
                } else {
                    nav = "Terms";
                }
                nav = ""
            }

            if (nav != "") {
                this.props.navigation.navigate(nav);
            }

        } catch (error) {
            // Error saving data
        }
    };

    _agree = async () => {
        try {
            await AsyncStorage.setItem('@agree:terms', 'true');
            this.props.navigation.navigate('Auth')
        } catch (error) {
            // Error saving data
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="동의합니다."
                    onPress={this._agree} />
            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
export default TermsScreen;