import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class PrivacyScreen extends React.Component {
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
                <Text>개인정보처리방침</Text>
                <Text>Count: {this.state.count}</Text>
                <Button
                    title="Go to Terms"
                    onPress={() => this.props.navigation.navigate('Terms')}
                />
            </View>
        );
    }
};

export default PrivacyScreen;