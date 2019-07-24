import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';

const Profile: React.FC = () => {
    return(
        <View>
            <Text>ProfileXD</Text>
            <Button title="Go back" />
        </View>
    );
}

export default Profile;