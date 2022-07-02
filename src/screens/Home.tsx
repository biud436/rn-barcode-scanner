/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate, navigateAndSimpleReset} from '../navigators/utils';

const Home = () => {
  // useEffect(() => {
  //   navigateAndSimpleReset('Home');
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>바코드를 스캔합니다.</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
