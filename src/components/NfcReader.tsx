/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcManager, {
  NfcError,
  NfcEvents,
  NfcTech,
} from 'react-native-nfc-manager';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {foundTag, resetFoundTag} from '../store/nfc';

export default function NfcReader() {
  const isFound = useSelector<RootState>(state => state.nfc.isFound) as boolean;

  const [isScanning, setIsScanning] = useState(false);
  const [id, setNfcID] = useState<string | undefined>(undefined);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const transformValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const foundNfcTag = () => {
    dispatch(foundTag());
  };

  const resetNfcTag = () => {
    dispatch(resetFoundTag());
  };

  const handleError = (message: string) => {
    resetNfcTag();

    throw new Error(message);
  };

  const isEnabled = async () => {
    return NfcManager.isEnabled();
  };

  const goToNfcSetting = async () => {
    return NfcManager.goToNfcSetting();
  };

  const readNdefOnce = () => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise(resolve => {
      let tagFound = false;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        tagFound = tag;
        resolve(tagFound);

        if (Platform.OS === 'ios') {
          NfcManager.setAlertMessageIOS('NDEF tag found');
        }

        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, (error: any) => {
        if (error) {
          handleException(error);
        }

        cleanUp();
        if (!tagFound) {
          resolve(true);
        }
      });

      NfcManager.registerTagEvent();
    });
  };

  const handleException = (ex: any) => {
    if (ex instanceof NfcError.UserCancel) {
    } else if (ex instanceof NfcError.Timeout) {
      Alert.alert('NFC Session Timeout');
    } else {
      console.warn(ex);

      if (Platform.OS === 'ios') {
        NfcManager.invalidateSessionWithErrorIOS(`${ex}`);
      } else {
        Alert.alert('NFC Error', `${ex}`);
      }
    }
  };

  const readNdef = useCallback(async () => {
    setIsScanning(true);

    Animated.timing(transformValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    try {
      if (Platform.OS === 'ios') {
        await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      } else if (Platform.OS === 'android') {
        await NfcManager.requestTechnology(NfcTech.NfcV);
      }
      const tag = await NfcManager.getTag();

      if (!tag) {
        throw new Error('No tag found');
      }

      foundNfcTag();

      const cmdTestReading = [0x02, 0x20, 0x01];
      const returnedValueFromTag = await NfcManager.transceive(cmdTestReading);

      setNfcID(tag.id);

      if (!returnedValueFromTag) {
        handleError('No returned value from tag');
      }

      console.warn('Tag found', tag);
    } catch (e) {
      NfcManager.cancelTechnologyRequest();
    } finally {
      setIsScanning(false);
      transformValue.setValue(0);
    }
  }, []);

  const opacityAnimStyle = {
    opacity: opacityValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    }),
  };

  const transformAnimStyle = {
    transform: [
      {
        translateY: transformValue.interpolate({
          inputRange: [0, 50, 100],
          outputRange: [0, 100, 0],
        }),
      },
      {
        rotate: transformValue.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ['0deg', '360deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.wrapper, opacityAnimStyle]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={readNdef}>
          <Text style={styles.scanningButton}>태그 스캔</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.tagDesciption}>
            태그 ID :{' '}
            {id?.split('').join('').match(/.{2}/g)?.reverse().join(' ')}
          </Text>
        </View>
      </View>
      {isScanning && (
        <Animated.View style={[styles.scanningBox, transformAnimStyle]}>
          <Text style={styles.whiteText}>스캔 중입니다...</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
    textAlign: 'center',
    height: 64,
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    fontSize: 28,
  },
  tagDesciption: {
    fontSize: 20,
  },
  scanningBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    height: 80,
    width: '100%',
    marginBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  whiteText: {
    color: '#fff',
  },
});
