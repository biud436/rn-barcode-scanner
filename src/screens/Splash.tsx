import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Svg, {Rect} from 'react-native-svg';
import {navigate} from '../navigators/utils';

export function Splash() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('window');

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 255,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    animatedValue.addListener(({value}) => {
      if (value >= 255) {
        navigate('Home');
      }
    });
  }, [animatedValue]);

  const backgroundBlack = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 255],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, backgroundBlack]}>
        <Svg width={width} height={height}>
          <Rect x={0} y={0} width={width} height={height} fill="#000" />
        </Svg>
      </Animated.View>
      <View style={styles.centerContainer}>
        <ActivityIndicator animating={true} color="#00f" size={'large'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
  },
});
