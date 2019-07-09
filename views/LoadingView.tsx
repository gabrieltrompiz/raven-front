import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { BlurView } from 'expo-blur'
import LottieView from 'lottie-react-native'

const LoadingView: React.FC = () => {
  return (
    <View style={styles.container}>
      <BlurView intensity={90} tint='light' style={{ width: 150, borderRadius: 10 }}>
        <LottieView source={require('../assets/loading-animation.json')} autoPlay loop style={{ width: 150 }}/>
      </BlurView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 5
  }
})

export default LoadingView;