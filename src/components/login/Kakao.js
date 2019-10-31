import React from 'react';
import { View, Text, Button } from 'react-native';


class Kakao extends React.Component {



    render() {
        return (
            <View style={{
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}>
                <Text>카카오</Text>
                <Button
                    title="Go to privacy"
                    onPress={() => this.props.navigation.navigate('Privacy')}
                />
            </View>
        );
    }

}
export default Kakao;