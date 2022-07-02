import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BarcodeScanner from '../screens/BarcodeScanner';
import Home from '../screens/Home';
import {navigationRef} from './utils';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: true}}
        initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: '바코드 스캐너',
          }}
          component={Home}
        />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
