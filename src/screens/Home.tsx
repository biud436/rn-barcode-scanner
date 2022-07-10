/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useMemo} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  PlatformColor,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {navigate} from '../navigators/utils';
import {Text} from 'react-native-paper';
import {Path, Svg} from 'react-native-svg';

const HomePresent = ({children}: {children?: React.ReactNode}) => {
  return (
    <>
      <HomeSvgBackground />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>바코드를 스캔합니다.</Text>
        <ProgressBar progress={0.5} color="black" />
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.button}
            adjustsFontSizeToFit
            onPress={() => {
              navigate('NfcReader');
            }}>
            NFC 스캔
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.button}
            adjustsFontSizeToFit
            onPress={() => {
              navigate('BarcodeScanner');
            }}>
            바코드 스캔 시작
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const HomeSvgBackground = () => {
  const {width, height} = Dimensions.get('window');

  const HALF_HEIGHT = useMemo(() => height / 2, [height]);

  return (
    <View>
      <Svg height={HALF_HEIGHT} width={width}>
        <Path
          d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z"
          fill="#171717"
          stroke="#171717"
        />
      </Svg>
    </View>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <HomePresent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    height: '100%',
  },
  descriptionContainer: {flex: 1, padding: 10, justifyContent: 'center'},
  description: {
    fontSize: 28,
  },
  buttonArea: {
    margin: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    width: '80%',
    height: '10%',
    marginBottom: 30,

    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
      },
      android: {
        elevation: 6,
        shadowColor: 'black',
      },
    }),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 3},
      },
      android: {
        elevation: 6,
      },
    }),
  },
  button: {
    flex: 1,
    backgroundColor: '#7b7979',
    color: '#ece8e8',
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
    width: '100%',
    height: '100%',
  },
});

export default Home;
