/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BarcodeScanner from './src/BarcodeScanner';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>바코드 스캔 테스트</Text>
      <BarcodeScanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
