import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class TermsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <Button
                    onPress={navigation.getParam('increaseCount')}
                    title="+1"
                    color="#fff"
                />
            ),
        };
    };
    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    state = {
        count: 0,
    };

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>개인정보보호 및 약관</Text>
                <Text>Count: {this.state.count}</Text>
                <Button
                    title="Go to Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }
};

export default TermsScreen;