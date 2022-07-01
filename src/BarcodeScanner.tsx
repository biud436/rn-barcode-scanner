/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Vibration, View} from 'react-native';
import {
  Camera,
  CameraApi,
  CameraScreen,
  CameraType,
} from 'react-native-camera-kit';

const BarcodeScanner = () => {
  const [isScaned, isSetScanned] = useState<boolean>(true);
  const camera = useRef<CameraApi>(null);
  const showAlert = useCallback((value: string) => {
    Alert.alert('스캔된 값', value);
  }, []);

  useEffect(() => {
    isSetScanned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!isScaned) {
      return;
    }
    isSetScanned(false);
    Vibration.vibrate();
    showAlert(event.nativeEvent.codeStringValue);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.scanner}
        ref={camera}
        cameraType={CameraType.Back} // Front/Back(default)
        scanBarcode
        flashMode="auto" // on/off/auto(default)
        focusMode="on" // off/on(default)
        zoomMode="on" // off/on(default)
        torchMode="off" // on/off(default)
        ratioOverlay="1:1" // optional
        ratioOverlayColor="#00000077" // optional
        resetFocusTimeout={0}
        resetFocusWhenMotionDetected={false}
        saveToCameraRole={false} // iOS only
        showFrame={false} // Barcode only, optional
        laserColor="red" // Barcode only, optional
        frameColor="yellow" // Barcode only, optional
        surfaceColor="blue" // Barcode only, optional
        onReadCode={onBarCodeRead}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scanner: {flex: 1},
});

export default BarcodeScanner;
