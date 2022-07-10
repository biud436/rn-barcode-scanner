import React, {useCallback, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import Svg, {Rect} from 'react-native-svg';
import {navigate} from '../navigators/utils';

export function Splash() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('window');
  const [status, setStatus] = useState('loading');

  /**
   * 로딩 상황에 따라 각기 다른 텍스트 표시
   */
  useCallback(() => {
    animatedValue.addListener(({value}) => {
      if (value >= 200) {
        setStatus('뛰는 중...');
      } else if (value >= 100) {
        setStatus('걷는 중...');
      } else {
        setStatus('자는 중...');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])();

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
        <Text style={styles.statusText}>{status}</Text>
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
  offsetText: {
    marginTop: 30,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
  },
  statusText: {
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    fontSize: 30,
  },
});
