import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import NfcReader from '../components/NfcReader';
import BarcodeScanner from '../screens/BarcodeScanner';
import Home from '../screens/Home';
import {PermissionScreen} from '../screens/PermissionScreen';
import {Splash} from '../screens/Splash';
import {navigationRef} from './utils';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{headerShown: true}}
                initialRouteName="Splash">
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen
                    name="Home"
                    options={{
                        headerTitle: '바코드 스캐너',
                    }}
                    component={Home}
                />
                <Stack.Screen
                    name="BarcodeScanner"
                    component={BarcodeScanner}
                />
                <Stack.Screen name="Permission" component={PermissionScreen} />
                <Stack.Screen name="NfcReader" component={NfcReader} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ApplicationNavigator;
